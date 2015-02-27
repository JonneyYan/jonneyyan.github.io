LiChang = {
            getByClass: function (oPare, cla) {
                var oChild = oPare.getElementsByTagName("*");
                var arr = [];
                for (var i = 0; i < oChild.length; i++) {
                    var arrCla = oChild[i].className.split(" ");
                    var j;
                    for (var j in arrCla) {
                        if (arrCla[j] == cla) {
                            arr.push(oChild[i]);
                            break;
                        }
                    }
                }
                return arr;
            }
        }
        function showDate(option) {
            this.obj = document.getElementById(option.id);
        }
        showDate.prototype.init = function () {
            var _self = this;
            _self.dateText = LiChang.getByClass(_self.obj, "showDate")[0];
            _self.dateBox = LiChang.getByClass(_self.obj, "sel-date")[0];
            _self.yearBox = LiChang.getByClass(_self.obj, "year")[0];
            _self.mnBox = LiChang.getByClass(_self.obj, "month")[0];
            _self.dataTable = LiChang.getByClass(_self.dateBox, "data-table")[0];
            _self.tbody = _self.dataTable.tBodies[0];
            _self.td = _self.tbody.getElementsByTagName("td");
            _self.prevM= LiChang.getByClass( _self.dateBox,"prev-m")[0];
            _self.nextM = LiChang.getByClass(_self.dateBox, "next-m")[0];
            //显示日历

            _self.changeDefault(this);
            _self.show();
            _self.showNow();
            // _self.dateText.blur();
            //点击选择日期
            for (var i = 0; i < _self.td.length; i++) {
                _self.td[i].onmouseover = function () {
                    if (this.className.indexOf("hove") == -1) {
                        this.className += " hover";
                    }
                }
                _self.td[i].onmouseout = function () {
                    this.className = this.className.replace("hover","")
                }
            }
            //点击切换月份
            _self.prevM.onclick =_self.nextM.onclick= function () {
                _self.changeMn(this);
                return this;
            }
        }
        //点击切换月份
        showDate.prototype.changeMn = function (obj) {
            var _self = this;
            var NewMn = parseInt(_self.mnBox.innerHTML, 10);
            
            var newYear = parseInt(_self.yearBox.innerHTML, 10);
            if (obj == _self.nextM) {
                NewMn++;
            } else {
                NewMn--;
            }
            if (NewMn < 1) {
                NewMn = 12;
                newYear -= 1;
            } else if (NewMn > 12) {
                NewMn = 1;
                newYear += 1;
            }
            _self.mnBox.innerHTML = NewMn;
            _self.showNow(newYear, NewMn);
        }

        //文本框 清空初始值
        showDate.prototype.changeDefault = function (obj) {
            var _self = this;
            var deVal = obj.defaultValue;
            if (obj.value == deVal) {
                obj.value = "";
            }
        }
        //文本框 还原初始值
        showDate.prototype.changeDefault2 = function (obj) {
            var _self = this;
            var deVal = obj.defaultValue;
            if (obj.value.match(/^\s{0}$/)) {
                obj.value = deVal;
            }
        }
        //显示日历
        showDate.prototype.show = function () {
            var _self = this;
            if (_self.dateBox.className.indexOf("dn") != -1) {
                var cls = _self.dateBox.className;
                _self.dateBox.className = cls.replace("dn", "");
            }
        }
        //填充年、月
        showDate.prototype.showNow = function (yr,mn) {
            var _self = this;
            var now = new Date();
            var year = yr || now.getFullYear();
            var month = mn-1 || now.getMonth();
            var dd = now.getDate();

            _self.today = [year, month, dd];

            //填充 年 和 月
            _self.yearBox.innerHTML = year;
            _self.mnBox.innerHTML = mn || now.getMonth()+1;
            //填充日期
            _self.showAllDay(year, month, dd);
        }
        //填充当月的所有日期
        showDate.prototype.showAllDay = function (Yr, Mn, Dd) {
            var _self = this;
            var arr31 = [1, 3, 5, 7, 8, 10, 12];            
            var is31 = true;
            var newDd = new Date();  //根据传入的数值生成新的日期
            newDd.setFullYear(Yr,Mn,Dd);
            var year = newDd.getFullYear(),
                month = newDd.getMonth(),
                dd = newDd.getDate();
            var firstD = new Date();
            firstD.setFullYear(year, month, 1);
            var firstDay = firstD.getDay();
            var str31 = arr31.join(",");
            var regExp = eval("/" + (month + 1) + ",|," + (month + 1) + ",|," + (month + 1) + "/g");
            var dayLen = 31;
            //判断每个月有多少天
            if (str31.search(regExp) == -1) {
                dayLen = 30;
            }
            //清空日期
            for (var i = 0; i < _self.td.length; i++) {
                _self.td[i].innerHTML = "";
                _self.td[i].className = _self.td[i].className.replace("active", "");
            }
            var now = new Date();

            //如果有31天
            for (var j = 0; j < dayLen; j++) {
                _self.td[j + firstDay].innerHTML = j + 1;
                if (year == now.getFullYear() && month == now.getMonth() && j+1 == now.getDate()) {
                    _self.td[j + firstDay].className += " ";
                    _self.td[j + firstDay].className += "active";
                }
            }
        }
        //函数调用
        window.onload = function () {
            var showDate1 = new showDate({ id: "calender" });
            showDate1.init();
        }