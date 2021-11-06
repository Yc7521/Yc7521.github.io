function jcalendar_week(options) {
    var _this = this;
    var defaults = {
        element: "#jcalendar_week",
        dayclick: function(date, obj) {
            $(obj).addClass("calendar_day_act").siblings().removeClass("calendar_day_act");
        },
        dayaddclass: function(date) {
            return null;
        },
        showbtn: true,
    };
    var opts = $.extend(defaults, options);
    var calendarid = $(opts.element);
    function addDOM() {
        calendarid.html("");
        var before_btn = opts.showbtn ? '<button class="switch_month beforem_btn">&lt;</button>' : '';
        var after_btn = opts.showbtn ? '<button class="switch_month afterm_btn">&gt;</button>' : '';
        var header_dom = '<div class="flex_i calendar_header ">' + before_btn + '<div class="flex_auto calendar_info" onclick="$(\'#pop\').show();"></div>' + after_btn + '</div>';
        var week_dom = '<li>周日</li><li>周一</li><li>周二</li><li>周三</li><li>周四</li><li>周五</li><li>周六</li>';
        var week_bar_dom = '<ul class="calendar_tr calendar_week">' + week_dom + '</ul>';
        var day_bar_dom = '<ul class="calendar_tr calendar_day_bar"></ul>';
        calendarid.append(header_dom + day_bar_dom + week_bar_dom);
    }
    addDOM();
    var todaydate = function() {
        var nstr = new Date();
        var ynow = nstr.getFullYear();
        var mnow = nstr.getMonth();
        var dnow = nstr.getDate();
        return [ynow, mnow, dnow];
    }
    var is_leap = function(year) {
        return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
    }
    _this.weeklastdate = function(year, weeknum) {
        var m_days = [31, 28 + is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var newyear_week = (new Date(year,0,1)).getDay();
        var week_day;
        if (newyear_week < 5) {
            week_day = 7 * (weeknum - 2) + (14 - newyear_week);
        } else {
            week_day = 7 * (weeknum - 1) + (14 - newyear_week);
        }
        var startmouch;
        for (var i = 0; i < m_days.length; i++) {
            startmouch = i;
            if (week_day > m_days[i]) {
                week_day -= m_days[i];
                if (i == m_days.length - 1) {
                    year++;
                    startmouch = 0;
                }
            } else {
                break;
            }
        }
        return [year, startmouch, week_day];
    }
    _this.weekfirstdate = function(year, weeknum) {
        var m_days = [31, 28 + is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var newyear_week = (new Date(year,0,1)).getDay();
        var week_day;
        if (newyear_week < 5) {
            week_day = 7 * (weeknum - 2) + (7 - newyear_week + 1);
        } else {
            week_day = 7 * (weeknum - 1) + (7 - newyear_week + 1);
        }
        var startmouch;
        for (var i = 0; i < m_days.length; i++) {
            startmouch = i;
            if (week_day > m_days[i]) {
                week_day -= m_days[i];
                if (i == m_days.length - 1) {
                    year++;
                    startmouch = 0;
                }
            } else {
                break;
            }
        }
        return [year, startmouch, week_day];
    }
    var setmonthdata = function(year, month) {
        var systime = new Date(year,month-1,1);
        var weekday = systime.getDay();
        var starDay = new Date(systime.getTime() - 86400000*weekday);
        var endDay = new Date(systime.getTime() + 86400000*(6-weekday));
        var week_day = "";
        var newdate;
        calendarid.find(".calendar_info").html(starDay.getFullYear()+'年'+(starDay.getMonth()+1)+'月'+starDay.getDate()+'日 - ' + endDay.getFullYear()+'年'+(endDay.getMonth()+1)+'月' + endDay.getDate()+'日');
        for (var i = 0; i < 7; i++) {
            newdate = new Date(systime - 86400000*weekday + i*86400000);
            var istoday = ''
            var todayarr = todaydate();
            if (newdate.getFullYear() == todayarr[0] && newdate.getMonth() == todayarr[1] && newdate.getDate() == todayarr[2]) {
                istoday = '<span class="today_i">今天</span>';
            }
            week_day += '<li class="calendar_day" ' + 'date="' + newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate() + '">' + '<span class="calendar_day_i">' + newdate.getDate() + '</span>' + istoday + '</li>';
        }
        newdate = null;
        calendarid.find(".calendar_day_bar").html(week_day);
    }
    var setdaydata = function(year, weeknum) {
        var m_days = [31, 28 + is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var datastart = _this.weekfirstdate(year, weeknum);
        var trueweeknum = _this.getweeknum(datastart[0], datastart[1], datastart[2]);
        var dataend = _this.weeklastdate(year, weeknum);
        calendarid.attr({
            "year": trueweeknum[0],
            "weeknum": trueweeknum[1]
        })
        $("#setyear").val(trueweeknum[0]);
        $("#setweek").val(trueweeknum[1]);
        $("#setmonth").val(datastart[1]+1);
        calendarid.find(".calendar_info").html(datastart[0]+'年'+(datastart[1]+1)+'月'+datastart[2]+'日 - ' + dataend[0]+'年'+(dataend[1]+1)+'月' + dataend[2]+'日');
        var week_day = "";
        var isdayaddclass = false;
        if (opts.dayaddclass() !== null) {
            isdayaddclass = true;
        }
        var dayaddclass = "";
        var newdate;
        for (var i = 0; i < 7; i++) {
            newdate = new Date(datastart[0],datastart[1],datastart[2] + i);
            if (isdayaddclass) {
                dayaddclass = " " + opts.dayaddclass(newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate());
            }
            var istoday = '';
            var todayarr = todaydate();
            if (newdate.getFullYear() == todayarr[0] && newdate.getMonth() == todayarr[1] && newdate.getDate() == todayarr[2]) {
                week_day += '<li class="calendar_day isToday' + dayaddclass + '" ' + 'date="' + newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate() + '">' + '<span class="calendar_day_i">' + newdate.getDate() + '</span></li>';
            } else {
                week_day += '<li class="calendar_day' + dayaddclass + '" ' + 'date="' + newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate() + '">' + '<span class="calendar_day_i">' + newdate.getDate() + '</span></li>';
            }

        }
        newdate = null;
        calendarid.find(".calendar_day_bar").html(week_day);
    }
    _this.getweeknum = function(year, month, day) {
        var m_days = [31, 28 + is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var newtonowday = 0;
        for (var i = 0; i < month; i++) {
            newtonowday += m_days[i];
        }
        newtonowday += day;
        var newyear_week = (new Date(year,0,1)).getDay();
        var fdaynothisy = false;
        if (newyear_week < 5) {
            newtonowday += newyear_week;
            if (newyear_week == 0 && m_days[2] == 29) {
                fdaynothisy = true;
            }
        } else {
            fdaynothisy = true;
            newtonowday -= (7 - newyear_week);
        }
        var weeknum_result = Math.ceil(newtonowday / 7);
        var weekyear = year;
        if (weeknum_result == 0) {
            var beforeyear_fweek = (new Date(weekyear - 1,0,1)).getDay();
            if (beforeyear_fweek < 5 && beforeyear_fweek > 1 && fdaynothisy) {
                weeknum_result = 53;
            } else {
                weeknum_result = 52;
            }
            weekyear--;
        } else if (weeknum_result > 52) {
            var year_lweek = (new Date(year,11,31)).getDay();
            if (year_lweek > 3 && newyear_week < 5) {
                weeknum_result = 53;
            } else {
                weekyear++;
                weeknum_result = 1;
            }
        }
        return [weekyear, weeknum_result];
    }
    _this.confirmmonth = function(year, month) {
        if (!year)
            year = $("#setyear").val();
        if (!month)
            month = $("#setweek").val();
        var weeknum = 0;
        var times = new Date(year,month,1).getTime();
        var nianchu = new Date(year,1,1).getTime();
        weeknum = Math.ceil((times - nianchu)/(86400000*7));
        setmonthdata(year,month)
        calendarid.find(".beforem_btn").off("click").on("click", function() {
            var beforew = weeknum - 1;
            var beforeweekfirst = _this.weekfirstdate(year, beforew);
            var beforeweekdata = _this.getweeknum(beforeweekfirst[0], beforeweekfirst[1], beforeweekfirst[2]);
            _this.confirmweek(beforeweekdata[0], beforeweekdata[1]);
        })
        calendarid.find(".afterm_btn").off("click").on("click", function() {
            var afterw = weeknum + 1;
            var afterweekfirst = _this.weekfirstdate(year, afterw);
            var afterweekdata = _this.getweeknum(afterweekfirst[0], afterweekfirst[1], afterweekfirst[2]);
            _this.confirmweek(afterweekdata[0], afterweekdata[1]);
        })
        calendarid.find(".calendar_day").on("click", function() {
            var obj = $(this);
            opts.dayclick(obj.attr("date"), this);
        })
    }
    _this.confirmweek = function(year, weeknum) {
        if (!year)
            year = $("#setyear").val();
        if (!weeknum)
            weeknum = $("#setweek").val();
        if (weeknum < 1)
            weeknum = 1;
        setdaydata(year, weeknum);
        calendarid.find(".beforem_btn").off("click").on("click", function() {
            var beforew = weeknum - 1;
            var beforeweekfirst = _this.weekfirstdate(year, beforew);
            var beforeweekdata = _this.getweeknum(beforeweekfirst[0], beforeweekfirst[1], beforeweekfirst[2]);
            _this.confirmweek(beforeweekdata[0], beforeweekdata[1]);
        })
        calendarid.find(".afterm_btn").off("click").on("click", function() {
            var afterw = weeknum + 1;
            var afterweekfirst = _this.weekfirstdate(year, afterw);
            var afterweekdata = _this.getweeknum(afterweekfirst[0], afterweekfirst[1], afterweekfirst[2]);
            _this.confirmweek(afterweekdata[0], afterweekdata[1]);
        })
        calendarid.find(".calendar_day").on("click", function() {
            var obj = $(this);
            opts.dayclick(obj.attr("date"), this);
        })
    }
    _this.nowweek = function() {
        var todayarr = todaydate();
        var weekdata = _this.getweeknum(todayarr[0], todayarr[1], todayarr[2]);
        _this.confirmweek(weekdata[0], weekdata[1]);
    }
    _this.nowweek();
}
