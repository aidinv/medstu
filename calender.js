import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import * as Font from 'expo-font';
import jalaali from 'jalaali-js';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const WEEK_DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
const PERSIAN_MONTH_NAMES = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
  'مرداد', 'شهریور', 'مهر', 'آبان',
  'آذر', 'دی', 'بهمن', 'اسفند'
];

function isLeapJalali(year) {
  return jalaali.isLeapJalaaliYear(year);
}

function getJalaliMonthLength(month, year) {
  if (month <= 5) return 31;
  if (month <= 10) return 30;
  return isLeapJalali(year) ? 30 : 29;
}

export default function PureJalaliCalendar({ username }) {
  const [year, setYear] = useState(1404);
  const [month, setMonth] = useState(4);
  const [selectedDay, setSelectedDay] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [firstWeekday, setFirstWeekday] = useState(0);

  // داده‌های دقیقه استفاده هر روز
  const [usageMinutesByDay, setUsageMinutesByDay] = useState({});
  // برای نمایش مدال
  const [currentMedal, setCurrentMedal] = useState(null);
  // نگهداری کل روزهای فعال برای محاسبه مدال
  const [allActiveDays, setAllActiveDays] = useState([]);

  // بارگذاری فونت
  const loadFonts = async () => {
    await Font.loadAsync({
      nazanin: require('./assets/fonts/nazanin.otf'),
    });
    setFontsLoaded(true);
  };

  // دریافت داده‌های روزهای استفاده
  const fetchUserUsageDays = async (targetYear, targetMonth) => {
    try {
      const res = await axios.post('https://draydinv.ir/extra/get_user_days.php', {
        username: username,
      });

      const usageData = res.data.usageData || [];

      const usageByDay = {};
      const activeDays = [];

      usageData.forEach(item => {
        const [gy, gm, gd] = item.date.split('-').map(Number);
        const { jy, jm, jd } = jalaali.toJalaali(gy, gm, gd);
        activeDays.push({ jy, jm: jm - 1, jd }); // توجه: jm-1 برای ایندکس ماه
        if (jy === targetYear && jm - 1 === targetMonth) {
          usageByDay[jd] = item.minutes;
        }
      });

      setUsageMinutesByDay(usageByDay);
      setAllActiveDays(activeDays);
      checkMedals(activeDays);
    } catch (error) {
      console.log('خطا در دریافت روزهای فعالیت:', error);
    }
  };

  // بروز رسانی تاریخ و شروع ماه
  const updateToCurrentDate = () => {
    const now = new Date();
    const { jy, jm, jd } = jalaali.toJalaali(now);
    setYear(jy);
    setMonth(jm - 1);
    setSelectedDay(jd);

    const firstDayDate = jalaali.toGregorian(jy, jm, 1);
    const firstDate = new Date(firstDayDate.gy, firstDayDate.gm - 1, firstDayDate.gd);
    setFirstWeekday(firstDate.getDay());

    fetchUserUsageDays(jy, jm - 1);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      updateToCurrentDate();
    }, [])
  );

  // رفتن به ماه بعد
  const goNextMonth = () => {
    const newMonth = month === 11 ? 0 : month + 1;
    const newYear = month === 11 ? year + 1 : year;
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDay(null);

    const firstDay = jalaali.toGregorian(newYear, newMonth + 1, 1);
    const jsDate = new Date(firstDay.gy, firstDay.gm - 1, firstDay.gd);
    setFirstWeekday(jsDate.getDay());

    fetchUserUsageDays(newYear, newMonth);
  };

  // رفتن به ماه قبل
  const goPrevMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1;
    const newYear = month === 0 ? year - 1 : year;
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDay(null);

    const firstDay = jalaali.toGregorian(newYear, newMonth + 1, 1);
    const jsDate = new Date(firstDay.gy, firstDay.gm - 1, firstDay.gd);
    setFirstWeekday(jsDate.getDay());

    fetchUserUsageDays(newYear, newMonth);
  };

  // بررسی مدال‌ها با ترتیب صحیح
  const checkMedals = (activityDays) => {
    if (activityDays.length === 0) {
      setCurrentMedal(null);
      return;
    }

    // مرتب سازی روزها
    activityDays.sort((a, b) => {
      if (a.jy !== b.jy) return a.jy - b.jy;
      if (a.jm !== b.jm) return a.jm - b.jm;
      return a.jd - b.jd;
    });

    // تبدیل روزها به عدد متوالی برای بررسی استریک
    const daysNums = activityDays.map(d => d.jy * 372 + d.jm * 31 + d.jd);

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < daysNums.length; i++) {
      if (daysNums[i] === daysNums[i - 1] + 1) {
        currentStreak++;
        if (currentStreak > longestStreak) longestStreak = currentStreak;
      } else {
        currentStreak = 1;
      }
    }

    const now = new Date();
    const { jy: nowYear, jm: nowMonth } = jalaali.toJalaali(now);

    // ۱۲ ماه اخیر برای مدال‌های ماهانه و بلندمدت
    const last12Months = [];
    for (let i = 0; i < 12; i++) {
      let m = nowMonth - i;
      let y = nowYear;
      if (m < 0) {
        m += 12;
        y -= 1;
      }
      last12Months.push(`${y}-${m}`);
    }

    const activeMonthsSet = new Set();
    activityDays.forEach(({ jy, jm }) => {
      if (last12Months.includes(`${jy}-${jm}`)) {
        activeMonthsSet.add(`${jy}-${jm}`);
      }
    });
    const activeMonthsCount = activeMonthsSet.size;

    // ترتیب درست بررسی مدال‌ها: ابتدا طولانی‌ترین استریک روزهای پیاپی
    if (longestStreak >= 365) {
      setCurrentMedal('مدال   را دریافت کردید 🏅');
    } else if (activeMonthsCount >= 6) {
      setCurrentMedal('مدال 6 ماهه را دریافت کردید 🏅');
    } else if (activeMonthsCount >= 3) {
      setCurrentMedal('مدال 3 ماهه را دریافت کردید 🏅');
    } else if (longestStreak >= 30) {
      setCurrentMedal('مدال 30 روزه 🔥');
    } else if (longestStreak >= 20) {
      setCurrentMedal('نشان 20 روز مطالعه مداوم را دریافت کردید 🔥');
    } else if (longestStreak >= 10) {
      setCurrentMedal('نشان 10 روز مطالعه مداوم را دریافت کردید 🔥');
    } else if (longestStreak >= 7) {
      setCurrentMedal('نشان 7 روز مطالعه مداوم را دریافت کردید 🔥');
    } else if (longestStreak >= 3) {
      setCurrentMedal('نشان 3 روز مطالعه مداوم را دریافت کردید 🔥');
    } else if (activeMonthsCount >= 1) {
      setCurrentMedal('مدال ماهانه 🏅');
    } else {
      setCurrentMedal(null);
    }
  };

  // تابع هایلایت روزها
  const getHighlightStyle = (day, index, days) => {
    const highlightedDays = Object.keys(usageMinutesByDay).map(d => parseInt(d));
    const isCurrent = highlightedDays.includes(day);
    const isPrev = highlightedDays.includes(days[index - 1]);
    const isNext = highlightedDays.includes(days[index + 1]);

    if (!isCurrent) return null;

    if (isPrev && isNext) {
      return styles.highlightedMiddle;
    } else if (isPrev) {
      return styles.highlightedEnd;
    } else if (isNext) {
      return styles.highlightedStart;
    } else {
      return styles.highlightedSingle;
    }
  };

  // تولید آرایه روزهای ماه همراه جای خالی های ابتدای هفته
  const generateCalendar = () => {
    const daysInMonth = getJalaliMonthLength(month, year);
    const days = [];

    // محاسبه جای خالی روز اول هفته (بسته به مقدار firstWeekday)
    const persianStart = (firstWeekday + 1) % 7;
    for (let i = 0; i < persianStart; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  };

  if (!fontsLoaded) return <Text>در حال بارگذاری فونت...</Text>;

  const days = generateCalendar();

  return (
    <View style={styles.container}>
      {/* هدر */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goPrevMonth}><Text style={styles.nav}>◀</Text></TouchableOpacity>
        <Text style={styles.title}>{PERSIAN_MONTH_NAMES[month]} {year}</Text>
        <TouchableOpacity onPress={goNextMonth}><Text style={styles.nav}>▶</Text></TouchableOpacity>
      </View>

      {/* نام روزهای هفته */}
      <View style={styles.weekRow}>
        {WEEK_DAYS.map((d, i) => (
          <Text key={i} style={styles.weekDay}>{d}</Text>
        ))}
      </View>

      {/* شبکه تقویم */}
      <ScrollView contentContainerStyle={styles.grid}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCell,
              day === selectedDay && styles.selectedDay,
              getHighlightStyle(day, index, days)
            ]}
            onPress={() => day && setSelectedDay(day)}
            disabled={day === null}
          >
            <Text style={
              day === selectedDay
                ? styles.selectedText
                : usageMinutesByDay[day]
                ? styles.highlightedText
                : styles.dayText
            }>
              {day ? day : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* نمایش اطلاعات روز انتخاب شده همراه دقیقه استفاده */}
      {selectedDay && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            اطلاعات روز {selectedDay} {PERSIAN_MONTH_NAMES[month]} {year}
          </Text>
          {usageMinutesByDay[selectedDay]
            ? <Text style={styles.infoSub}>• دکتر میزان مطالعه شما در این روز {usageMinutesByDay[selectedDay]} دقیقه بوده است !</Text>
            : <Text style={styles.infoSub}>• فعالیتی ثبت نشده است !</Text>
          }
        </View>
      )}

      {/* نمایش مدال */}
      {currentMedal && (
        <View style={styles.medalBox}>
          <Text style={styles.medalText}>{currentMedal}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16, backgroundColor: '', marginBottom: 0
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  title: {
    fontSize: 20, color: '#06d6a0', fontFamily: 'nazanin'
  },
  nav: {
    fontSize: 24, color: '#06d6a0', fontFamily: 'nazanin'
  },
  weekRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0
  },
  weekDay: {
    width: `${100 / 7}%`, textAlign: 'center', color: '#666', fontFamily: 'nazanin'
  },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap'
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4
  },
  dayText: {
    fontSize: 20, color: '#333', fontFamily: 'nazanin'
  },
  selectedDay: {
    backgroundColor: '#d0f0e8', borderRadius: 10
  },
  selectedText: {
    color: '#333', fontFamily: 'nazanin', fontSize: 20
  },
  highlightedText: {
    color: '#000', fontFamily: 'nazanin', fontSize: 20
  },
  highlightedStart: {
    backgroundColor: '#d0f0e8',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  highlightedMiddle: {
    backgroundColor: '#d0f0e8',
  },
  highlightedEnd: {
    backgroundColor: '#d0f0e8',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  highlightedSingle: {
    backgroundColor: '#d0f0e8',
    borderRadius: 15,
  },
  infoBox: {
    backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12,justifyContent:'flex-end',alignSelf:'flex-end'
  },
  infoText: {
    fontFamily: 'nazanin', fontSize: 18, color: '#444'
  },
  infoSub: {
    fontFamily: 'nazanin', fontSize: 16, color: '#777'
  },
  medalBox: {
    backgroundColor: '#e0ffe9', padding: 12, marginTop: 12, borderRadius: 12, alignItems: 'center'
  },
  medalText: {
    fontSize: 18, fontFamily: 'nazanin', color: '#06d6a0'
  }
});
