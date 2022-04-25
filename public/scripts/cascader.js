! function (a) {
    a.fn.cascader = function (l) {
        function i(l, i) {
            l.each(function () {
                var l = a(this).attr("data-label");
                if (i == l) {
                    var e = a(this);
                    a(this).addClass("on").siblings().removeClass("on"), n(e)
                }
            })
        }

        function n(a) {
            var l = a.parents("ul");
            if (a.size() > 0) {
                var i = l.scrollTop(),
                    n = a.position().top + i;
                n > i && (n -= (l.height() - a.height()) / 2, l.scrollTop(n))
            }
        }

        function e(a, l) {
            for (var i in a) a[i].label == l && (O = a[i].children);
            d(O)
        }

        function t(a, l) {
            for (var i in a) {
                if (a[i].value == l) {
                    x = a[i].children, s();
                    break
                }
                t(a[i].children, l)
            }
        }

        function s() {
            x ? (b.find(".dlist_ul").eq(k).nextAll().remove(), d(x), f(g), p.changeOnSelect && c()) : (b.find(".dlist_ul").eq(k).nextAll().remove(), c(), h())
        }

        function d(l) {
            var i = l,
                n = [];
            ul = a('<ul class="dlist_ul"></ul>'), a.each(i, function (a, l) {
                var i = "";
                l.children || (i = "lastchild"), n.push('<li data-label="' + l.label + '" data-value="' + l.value + '" class="item ' + i + '">' + l.label + "</li>")
            }), ul.append(n.join("")), g.append(ul)
        }

        function c() {
            q = [], g.find("li.on").each(function () {
                var l = a(this).attr("data-label"),
                    i = a(this).attr("data-value");
                q.push({
                    value: i,
                    label: l
                })
            });
            var l = r(q);
            m.attr("placeholder", ""), _.html(l), p.selectFn(q)
        }

        function r(l) {
            var i = [];
            return a.each(l, function (a, l) {
                var n = l.label;
                i.push(n)
            }), str = i.join(" / ")
        }

        function u(a, l) {
            for (var i in a) {
                l || (l = "");
                var n = l + "" + a[i].label + "/";
                a[i].children ? (x = a[i].children, u(x, n)) : (n = n.substring(0, n.lastIndexOf("/")), y.push(n), A.push(a[i].value))
            }
        }

        function o(l) {
            var i = [];
            ul = a('<ul class="dlist_ul dlist_search"></ul>'), a.each(y, function (a, n) {
                if (-1 != n.indexOf(l)) {
                    var e = A[a];
                    i.push('<li data-value="' + e + '" class="item2">' + n + "</li>")
                }
            }), 0 != i.length ? (C.empty(), ul.append(i.join("")), C.append(ul), f(C)) : (C.empty(), ul.append('<li class="nosearch">无匹配数据</li>'), C.append(ul), f(C))
        }

        function h() {
            b.removeClass("open"), b.find(".dlist").addClass("hid")
        }

        function f(a) {
            b.addClass("open"), a.removeClass("hid")
        }
        var v = {
                data: [],
                changeOnSelect: !1,
                selectFn: function () {}
            },
            p = a.extend(v, l),
            b = this,
            m = b.find(".searchtxt"),
            g = b.find(".dlist").eq(0),
            C = b.find(".searchdlist"),
            x = [],
            _ = b.find(".labelshow"),
            k = 0,
            j = !1,
            q = [],
            y = [],
            O = [],
            A = [],
            z = !1;
        _.bind("click", function () {
            z || (m.trigger("focus"), z = !0)
        }), m.bind("focus", function () {
            j ? C.hasClass("hid") && f(g) : (d(p.data), f(g), u(p.data), j = !0)
        }).bind("blur", function () {
            z = !1
        }).bind("keyup", function () {
            var l = a(this).val();
            h(), _.addClass("hid"), l.length > 0 ? o(l) : h()
        }), g.delegate("li.item", "click", function () {
            var l = a(this).parent().index(),
                i = a(this).attr("data-value");
            a(this).addClass("on").siblings().removeClass("on"), k = l, t(p.data, i)
        }), C.delegate("li.item2", "click", function () {
            var l = a(this).text().split("/"),
                n = g.find(".dlist_ul").eq(0),
                t = l.length;
            n.nextAll().remove(), e(p.data, l[0]);
            for (var s = 1; t - 1 > s; s++) e(O, l[s]);
            g.find(".dlist_ul").each(function (n) {
                var e = a(this).find("li");
                i(e, l[n]), n == t - 1 && (c(), _.removeClass("hid"), m.val(""), h())
            })
        });
        var F = function (l) {
            if (!g.hasClass("hid") || !C.hasClass("hid")) {
                var i = a(l.target).parents(".cascaderbox");
                0 == i.size() && (h(), _.hasClass("hid") && (_.removeClass("hid"), m.val("")))
            }
        };
        a("html").bind("click", F)
    }
}(jQuery);