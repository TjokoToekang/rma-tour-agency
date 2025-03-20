/*!
 *
 *             jsPDF AutoTable plugin v3.5.6
 *
 *             Copyright (c) 2020 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable
 *             Licensed under the MIT License.
 *             http://opensource.org/licenses/mit-license
 *
 */
!(function (t, e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e(
      (function () {
        try {
          return require("jspdf");
        } catch (t) {}
      })()
    );
  else if ("function" == typeof define && define.amd) define(["jspdf"], e);
  else {
    var n =
      "object" == typeof exports
        ? e(
            (function () {
              try {
                return require("jspdf");
              } catch (t) {}
            })()
          )
        : e(t.jsPDF);
    for (var o in n) ("object" == typeof exports ? exports : t)[o] = n[o];
  }
})(void 0 !== this ? this : window, function (t) {
  return (function (t) {
    var e = {};
    function n(o) {
      if (e[o]) return e[o].exports;
      var r = (e[o] = { i: o, l: !1, exports: {} });
      return t[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function (t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: o });
      }),
      (n.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (
          (n.r(o),
          Object.defineProperty(o, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            n.d(
              o,
              r,
              function (e) {
                return t[e];
              }.bind(null, r)
            );
        return o;
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 10))
    );
  })([
    function (t, e, n) {
      "use strict";
      function o(t, e) {
        var n = t > 0,
          o = e || 0 === e;
        return n && o ? "DF" : n ? "S" : o ? "F" : null;
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.parseSpacing =
          e.getFillStyle =
          e.addTableBorder =
          e.getStringWidth =
            void 0),
        (e.getStringWidth = function (t, e, n) {
          return (
            n.applyStyles(e, !0),
            (Array.isArray(t) ? t : [t])
              .map(function (t) {
                return n.getTextWidth(t);
              })
              .reduce(function (t, e) {
                return Math.max(t, e);
              }, 0)
          );
        }),
        (e.addTableBorder = function (t, e, n, r) {
          var i = e.settings.tableLineWidth,
            l = e.settings.tableLineColor;
          t.applyStyles({ lineWidth: i, lineColor: l });
          var a = o(i, !1);
          a && t.rect(n.x, n.y, e.getWidth(t.pageSize().width), r.y - n.y, a);
        }),
        (e.getFillStyle = o),
        (e.parseSpacing = function (t, e) {
          var n, o, r, i;
          if (((t = t || e), Array.isArray(t))) {
            if (t.length >= 4)
              return { top: t[0], right: t[1], bottom: t[2], left: t[3] };
            if (3 === t.length)
              return { top: t[0], right: t[1], bottom: t[2], left: t[1] };
            if (2 === t.length)
              return { top: t[0], right: t[1], bottom: t[0], left: t[1] };
            t = 1 === t.length ? t[0] : e;
          }
          return "object" == typeof t
            ? ("number" == typeof t.vertical &&
                ((t.top = t.vertical), (t.bottom = t.vertical)),
              "number" == typeof t.horizontal &&
                ((t.right = t.horizontal), (t.left = t.horizontal)),
              {
                left: null !== (n = t.left) && void 0 !== n ? n : e,
                top: null !== (o = t.top) && void 0 !== o ? o : e,
                right: null !== (r = t.right) && void 0 !== r ? r : e,
                bottom: null !== (i = t.bottom) && void 0 !== i ? i : e,
              })
            : ("number" != typeof t && (t = e),
              { top: t, right: t, bottom: t, left: t });
        });
    },
    function (t, e, n) {
      "use strict";
      var o,
        r =
          (this && this.__extends) ||
          ((o = function (t, e) {
            return (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
              })(t, e);
          }),
          function (t, e) {
            function n() {
              this.constructor = t;
            }
            o(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.getTheme =
          e.defaultStyles =
          e.HtmlRowInput =
          e.FONT_ROW_RATIO =
            void 0),
        (e.FONT_ROW_RATIO = 1.15);
      var i = (function (t) {
        function e(e) {
          var n = t.call(this) || this;
          return (n._element = e), n;
        }
        return r(e, t), e;
      })(Array);
      (e.HtmlRowInput = i),
        (e.defaultStyles = function (t) {
          return {
            font: "helvetica",
            fontStyle: "normal",
            overflow: "linebreak",
            fillColor: !1,
            textColor: 20,
            halign: "left",
            valign: "top",
            fontSize: 10,
            cellPadding: 5 / t,
            lineColor: 200,
            lineWidth: 0,
            cellWidth: "auto",
            minCellHeight: 0,
            minCellWidth: 0,
          };
        }),
        (e.getTheme = function (t) {
          return {
            striped: {
              table: { fillColor: 255, textColor: 80, fontStyle: "normal" },
              head: {
                textColor: 255,
                fillColor: [41, 128, 185],
                fontStyle: "bold",
              },
              body: {},
              foot: {
                textColor: 255,
                fillColor: [41, 128, 185],
                fontStyle: "bold",
              },
              alternateRow: { fillColor: 245 },
            },
            grid: {
              table: {
                fillColor: 255,
                textColor: 80,
                fontStyle: "normal",
                lineWidth: 0.1,
              },
              head: {
                textColor: 255,
                fillColor: [26, 188, 156],
                fontStyle: "bold",
                lineWidth: 0,
              },
              body: {},
              foot: {
                textColor: 255,
                fillColor: [26, 188, 156],
                fontStyle: "bold",
                lineWidth: 0,
              },
              alternateRow: {},
            },
            plain: { head: { fontStyle: "bold" }, foot: { fontStyle: "bold" } },
          }[t];
        });
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.DocHandler = void 0);
      var o = {},
        r = (function () {
          function t(t) {
            (this.jsPDFDocument = t),
              (this.userStyles = {
                textColor: t.getTextColor
                  ? this.jsPDFDocument.getTextColor()
                  : 0,
                fontSize: t.internal.getFontSize(),
                fontStyle: t.internal.getFont().fontStyle,
                font: t.internal.getFont().fontName,
              });
          }
          return (
            (t.setDefaults = function (t, e) {
              void 0 === e && (e = null),
                e ? (e.__autoTableDocumentDefaults = t) : (o = t);
            }),
            (t.unifyColor = function (t) {
              return Array.isArray(t)
                ? t
                : "number" == typeof t
                ? [t, t, t]
                : "string" == typeof t
                ? [t]
                : null;
            }),
            (t.prototype.applyStyles = function (e, n) {
              var o, r, i;
              if (
                (void 0 === n && (n = !1),
                e.fontStyle && this.jsPDFDocument.setFontStyle(e.fontStyle),
                e.font)
              ) {
                var l = this.getFontList()[e.font],
                  a = e.fontStyle;
                l &&
                  a &&
                  -1 === l.indexOf(a) &&
                  this.jsPDFDocument.setFontStyle(l[0]),
                  this.jsPDFDocument.setFont(e.font);
              }
              if (
                (e.fontSize && this.jsPDFDocument.setFontSize(e.fontSize), !n)
              ) {
                var s = t.unifyColor(e.fillColor);
                s && (o = this.jsPDFDocument).setFillColor.apply(o, s),
                  (s = t.unifyColor(e.textColor)) &&
                    (r = this.jsPDFDocument).setTextColor.apply(r, s),
                  (s = t.unifyColor(e.lineColor)) &&
                    (i = this.jsPDFDocument).setDrawColor.apply(i, s),
                  "number" == typeof e.lineWidth &&
                    this.jsPDFDocument.setLineWidth(e.lineWidth);
              }
            }),
            (t.prototype.splitTextToSize = function (t, e, n) {
              return this.jsPDFDocument.splitTextToSize(t, e, n);
            }),
            (t.prototype.rect = function (t, e, n, o, r) {
              return this.jsPDFDocument.rect(t, e, n, o, r);
            }),
            (t.prototype.getLastAutoTable = function () {
              return this.jsPDFDocument.lastAutoTable || null;
            }),
            (t.prototype.getTextWidth = function (t) {
              return this.jsPDFDocument.getTextWidth(t);
            }),
            (t.prototype.getDocument = function () {
              return this.jsPDFDocument;
            }),
            (t.prototype.setPage = function (t) {
              this.jsPDFDocument.setPage(t);
            }),
            (t.prototype.addPage = function () {
              return this.jsPDFDocument.addPage();
            }),
            (t.prototype.getFontList = function () {
              return this.jsPDFDocument.getFontList();
            }),
            (t.prototype.getGlobalOptions = function () {
              return o || {};
            }),
            (t.prototype.getDocumentOptions = function () {
              return this.jsPDFDocument.__autoTableDocumentDefaults || {};
            }),
            (t.prototype.pageSize = function () {
              var t = this.jsPDFDocument.internal.pageSize;
              return (
                null == t.width &&
                  (t = { width: t.getWidth(), height: t.getHeight() }),
                t
              );
            }),
            (t.prototype.scaleFactor = function () {
              return this.jsPDFDocument.internal.scaleFactor;
            }),
            (t.prototype.pageNumber = function () {
              var t = this.jsPDFDocument.internal.getCurrentPageInfo();
              return t
                ? t.pageNumber
                : this.jsPDFDocument.internal.getNumberOfPages();
            }),
            t
          );
        })();
      e.DocHandler = r;
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.assign = void 0),
        (e.assign = function (t, e, n, o, r) {
          if (null == t)
            throw new TypeError("Cannot convert undefined or null to object");
          for (var i = Object(t), l = 1; l < arguments.length; l++) {
            var a = arguments[l];
            if (null != a)
              for (var s in a)
                Object.prototype.hasOwnProperty.call(a, s) && (i[s] = a[s]);
          }
          return i;
        });
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.parseHtml = void 0);
      var o = n(12),
        r = n(1);
      function i(t, e, n, i, a, s) {
        for (var u = new r.HtmlRowInput(i), d = 0; d < i.cells.length; d++) {
          var h = i.cells[d],
            c = n.getComputedStyle(h);
          if (a || "none" !== c.display) {
            var f = void 0;
            s && (f = o.parseCss(t, h, e, c, n)),
              u.push({
                rowSpan: h.rowSpan,
                colSpan: h.colSpan,
                styles: f,
                _element: h,
                content: l(h),
              });
          }
        }
        var p = n.getComputedStyle(i);
        if (u.length > 0 && (a || "none" !== p.display)) return u;
      }
      function l(t) {
        var e = t.cloneNode(!0);
        return (
          (e.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/ +/g, " ")),
          (e.innerHTML = e.innerHTML
            .split("<br>")
            .map(function (t) {
              return t.trim();
            })
            .join("\n")),
          e.innerText || e.textContent || ""
        );
      }
      e.parseHtml = function (t, e, n, o, r) {
        var l, a, s;
        void 0 === o && (o = !1),
          void 0 === r && (r = !1),
          (s = "string" == typeof e ? n.document.querySelector(e) : e);
        var u = Object.keys(t.getFontList()),
          d = t.scaleFactor(),
          h = [],
          c = [],
          f = [];
        if (!s)
          return (
            console.error("Html table could not be found with input: ", e),
            { head: h, body: c, foot: f }
          );
        for (var p = 0; p < s.rows.length; p++) {
          var g = s.rows[p],
            y =
              null ===
                (a =
                  null === (l = null == g ? void 0 : g.parentElement) ||
                  void 0 === l
                    ? void 0
                    : l.tagName) || void 0 === a
                ? void 0
                : a.toLowerCase(),
            v = i(u, d, n, g, o, r);
          v &&
            ("thead" === y ? h.push(v) : "tfoot" === y ? f.push(v) : c.push(v));
        }
        return { head: h, body: c, foot: f };
      };
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = function (t, e, n, o, r) {
          o = o || {};
          var i = r.internal.scaleFactor,
            l = r.internal.getFontSize() / i,
            a = "",
            s = 1;
          if (
            (("middle" !== o.valign &&
              "bottom" !== o.valign &&
              "center" !== o.halign &&
              "right" !== o.halign) ||
              (s =
                (a = "string" == typeof t ? t.split(/\r\n|\r|\n/g) : t)
                  .length || 1),
            (n += l * (2 - 1.15)),
            "middle" === o.valign
              ? (n -= (s / 2) * l * 1.15)
              : "bottom" === o.valign && (n -= s * l * 1.15),
            "center" === o.halign || "right" === o.halign)
          ) {
            var u = l;
            if (("center" === o.halign && (u *= 0.5), a && s >= 1)) {
              for (var d = 0; d < a.length; d++)
                r.text(a[d], e - r.getStringUnitWidth(a[d]) * u, n),
                  (n += 1.15 * l);
              return r;
            }
            e -= r.getStringUnitWidth(t) * u;
          }
          return (
            "justify" === o.halign
              ? r.text(t, e, n, {
                  maxWidth: o.maxWidth || 100,
                  align: "justify",
                })
              : r.text(t, e, n),
            r
          );
        });
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.parseInput = void 0);
      var o = n(4),
        r = n(3),
        i = n(0),
        l = n(2),
        a = n(13);
      function s(t, e, n) {
        var o = t[0] || e[0] || n[0] || [],
          r = [];
        return (
          Object.keys(o)
            .filter(function (t) {
              return "_element" !== t;
            })
            .forEach(function (t) {
              var e,
                n = 1;
              "object" !=
                typeof (e = Array.isArray(o) ? o[parseInt(t)] : o[t]) ||
                Array.isArray(e) ||
                (n = (null == e ? void 0 : e.colSpan) || 1);
              for (var i = 0; i < n; i++) {
                var l = {
                  dataKey: Array.isArray(o)
                    ? r.length
                    : t + (i > 0 ? "_" + i : ""),
                };
                r.push(l);
              }
            }),
          r
        );
      }
      e.parseInput = function (t, e) {
        var n = new l.DocHandler(t),
          u = n.getDocumentOptions(),
          d = n.getGlobalOptions();
        a.default(n, d, u, e);
        var h,
          c = r.assign({}, d, u, e);
        "undefined" != typeof window && (h = window);
        var f = (function (t, e, n) {
            for (
              var o = {
                  styles: {},
                  headStyles: {},
                  bodyStyles: {},
                  footStyles: {},
                  alternateRowStyles: {},
                  columnStyles: {},
                },
                i = function (i) {
                  if ("columnStyles" === i) {
                    var l = t[i],
                      a = e[i],
                      s = n[i];
                    o.columnStyles = r.assign({}, l, a, s);
                  } else {
                    var u = [t, e, n].map(function (t) {
                      return t[i] || {};
                    });
                    o[i] = r.assign({}, u[0], u[1], u[2]);
                  }
                },
                l = 0,
                a = Object.keys(o);
              l < a.length;
              l++
            ) {
              var s = a[l];
              i(s);
            }
            return o;
          })(d, u, e),
          p = (function (t, e, n) {
            for (
              var o = {
                  didParseCell: [],
                  willDrawCell: [],
                  didDrawCell: [],
                  didDrawPage: [],
                },
                r = 0,
                i = [t, e, n];
              r < i.length;
              r++
            ) {
              var l = i[r];
              l.didParseCell && o.didParseCell.push(l.didParseCell),
                l.willDrawCell && o.willDrawCell.push(l.willDrawCell),
                l.didDrawCell && o.didDrawCell.push(l.didDrawCell),
                l.didDrawPage && o.didDrawPage.push(l.didDrawPage);
            }
            return o;
          })(d, u, e),
          g = (function (t, e) {
            var n,
              o,
              r,
              l,
              a,
              s,
              u,
              d,
              h,
              c,
              f,
              p,
              g = i.parseSpacing(e.margin, 40 / t.scaleFactor()),
              y =
                null !==
                  (n = (function (t, e) {
                    var n = t.getLastAutoTable(),
                      o = t.scaleFactor(),
                      r = t.pageNumber(),
                      i = !1;
                    if (n && n.startPageNumber) {
                      var l = n.startPageNumber + n.pageNumber - 1;
                      i = l === r;
                    }
                    if ("number" == typeof e) return e;
                    if (
                      (null == e || !1 === e) &&
                      i &&
                      null != (null == n ? void 0 : n.finalY)
                    )
                      return n.finalY + 20 / o;
                    return null;
                  })(t, e.startY)) && void 0 !== n
                  ? n
                  : g.top;
            f =
              !0 === e.showFoot
                ? "everyPage"
                : !1 === e.showFoot
                ? "never"
                : null !== (o = e.showFoot) && void 0 !== o
                ? o
                : "everyPage";
            p =
              !0 === e.showHead
                ? "everyPage"
                : !1 === e.showHead
                ? "never"
                : null !== (r = e.showHead) && void 0 !== r
                ? r
                : "everyPage";
            var v = null !== (l = e.useCss) && void 0 !== l && l,
              m = e.theme || (v ? "plain" : "striped");
            return {
              includeHiddenHtml:
                null !== (a = e.includeHiddenHtml) && void 0 !== a && a,
              useCss: v,
              theme: m,
              startY: y,
              margin: g,
              pageBreak:
                null !== (s = e.pageBreak) && void 0 !== s ? s : "auto",
              rowPageBreak:
                null !== (u = e.rowPageBreak) && void 0 !== u ? u : "auto",
              tableWidth:
                null !== (d = e.tableWidth) && void 0 !== d ? d : "auto",
              showHead: p,
              showFoot: f,
              tableLineWidth:
                null !== (h = e.tableLineWidth) && void 0 !== h ? h : 0,
              tableLineColor:
                null !== (c = e.tableLineColor) && void 0 !== c ? c : 200,
            };
          })(n, c),
          y = (function (t, e, n) {
            var r = e.head || [],
              i = e.body || [],
              l = e.foot || [];
            if (e.html) {
              var a = e.includeHiddenHtml;
              if (n) {
                var u = o.parseHtml(t, e.html, n, a, e.useCss) || {};
                (r = u.head || r), (i = u.body || r), (l = u.foot || r);
              } else
                console.error("Cannot parse html in non browser environment");
            }
            return {
              columns: e.columns || s(r, i, l),
              head: r,
              body: i,
              foot: l,
            };
          })(n, c, h);
        return { id: e.tableId, content: y, hooks: p, styles: f, settings: g };
      };
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.addPage = e.drawTable = void 0);
      var o = n(1),
        r = n(0),
        i = n(8),
        l = n(2),
        a = n(3),
        s = n(5);
      function u(t, e, n) {
        var r = (t.styles.fontSize / n.scaleFactor()) * o.FONT_ROW_RATIO,
          i = t.padding("vertical"),
          l = Math.floor((e - i) / r);
        return Math.max(0, l);
      }
      function d(t, e, n, o) {
        o.x = e.settings.margin.left;
        for (var i = 0, l = e.columns; i < l.length; i++) {
          var a = l[i],
            u = n.cells[a.index];
          if (u)
            if (
              (t.applyStyles(u.styles),
              (u.x = o.x),
              (u.y = o.y),
              !1 !== e.callCellHooks(t, e.hooks.willDrawCell, u, n, a, o))
            ) {
              var d = u.styles,
                h = r.getFillStyle(d.lineWidth, d.fillColor);
              h && t.rect(u.x, o.y, u.width, u.height, h);
              var c = u.getTextPos();
              s.default(
                u.text,
                c.x,
                c.y,
                {
                  halign: u.styles.halign,
                  valign: u.styles.valign,
                  maxWidth: Math.ceil(
                    u.width - u.padding("left") - u.padding("right")
                  ),
                },
                t.getDocument()
              ),
                e.callCellHooks(t, e.hooks.didDrawCell, u, n, a, o),
                (o.x += a.width);
            } else o.x += a.width;
          else o.x += a.width;
        }
        o.y += n.height;
      }
      function h(t, e, n, o) {
        t.applyStyles(t.userStyles),
          "everyPage" === e.settings.showFoot &&
            e.foot.forEach(function (n) {
              return d(t, e, n, o);
            }),
          e.callEndPageHooks(t, o);
        var i = e.settings.margin;
        r.addTableBorder(t, e, n, o),
          c(t),
          e.pageNumber++,
          e.pageCount++,
          (o.x = i.left),
          (o.y = i.top),
          "everyPage" === e.settings.showHead &&
            e.head.forEach(function (n) {
              return d(t, e, n, o);
            });
      }
      function c(t) {
        var e = t.pageNumber();
        t.setPage(e + 1), t.pageNumber() === e && t.addPage();
      }
      (e.drawTable = function (t, e) {
        var n = e.settings,
          o = n.startY,
          s = n.margin,
          f = { x: s.left, y: o },
          p = e.getHeadHeight(e.columns) + e.getFootHeight(e.columns),
          g = o + s.bottom + p;
        "avoid" === n.pageBreak &&
          (g += e.allRows().reduce(function (t, e) {
            return t + e.height;
          }, 0));
        var y = new l.DocHandler(t);
        ("always" === n.pageBreak ||
          (null != n.startY && g > y.pageSize().height)) &&
          (c(y), (f.y = s.top));
        var v = a.assign({}, f);
        (e.startPageNumber = y.pageNumber()),
          y.applyStyles(y.userStyles),
          ("firstPage" !== n.showHead && "everyPage" !== n.showHead) ||
            e.head.forEach(function (t) {
              return d(y, e, t, f);
            }),
          y.applyStyles(y.userStyles),
          e.body.forEach(function (t, n) {
            var o = n === e.body.length - 1;
            !(function t(e, n, o, r, l, s) {
              var c = (function (t, e, n, o) {
                var r = e.settings.margin.bottom,
                  i = e.settings.showFoot;
                ("everyPage" === i || ("lastPage" === i && n)) &&
                  (r += e.getFootHeight(e.columns));
                return t.pageSize().height - o.y - r;
              })(e, n, r, s);
              if (o.canEntireRowFit(c, n.columns)) d(e, n, o, s);
              else if (
                (function (t, e, n, o) {
                  var r = t.pageSize().height,
                    i = o.settings.margin,
                    l = i.top + i.bottom,
                    a = r - l;
                  "body" === e.section &&
                    (a -=
                      o.getHeadHeight(o.columns) + o.getFootHeight(o.columns));
                  var s = e.getMinimumRowHeight(o.columns, t),
                    u = s < n;
                  if (s > a)
                    return (
                      console.error(
                        "Will not be able to print row " +
                          e.index +
                          " correctly since it's minimum height is larger than page height"
                      ),
                      !0
                    );
                  if (!u) return !1;
                  var d = e.hasRowSpan(o.columns);
                  if (e.getMaxCellHeight(o.columns) > a)
                    return (
                      d &&
                        console.error(
                          "The content of row " +
                            e.index +
                            " will not be drawn correctly since drawing rows with a height larger than the page height and has cells with rowspans is not supported."
                        ),
                      !0
                    );
                  if (d) return !1;
                  if ("avoid" === o.settings.rowPageBreak) return !1;
                  return !0;
                })(e, o, c, n)
              ) {
                var f = (function (t, e, n, o) {
                  var r = {};
                  t.spansMultiplePages = !0;
                  for (var l = 0, s = 0, d = n.columns; s < d.length; s++) {
                    var h = d[s];
                    if ((m = t.cells[h.index])) {
                      Array.isArray(m.text) || (m.text = [m.text]);
                      var c = new i.Cell(m.raw, m.styles, m.section);
                      (c = a.assign(c, m)).text = [];
                      var f = u(m, e, o);
                      m.text.length > f &&
                        (c.text = m.text.splice(f, m.text.length));
                      var p = o.scaleFactor();
                      (m.contentHeight = m.getContentHeight(p)),
                        m.contentHeight >= e &&
                          ((m.contentHeight = e),
                          (c.styles.minCellHeight -= e)),
                        m.contentHeight > t.height &&
                          (t.height = m.contentHeight),
                        (c.contentHeight = c.getContentHeight(p)),
                        c.contentHeight > l && (l = c.contentHeight),
                        (r[h.index] = c);
                    }
                  }
                  var g = new i.Row(t.raw, -1, t.section, r, !0);
                  g.height = l;
                  for (var y = 0, v = n.columns; y < v.length; y++) {
                    var m;
                    h = v[y];
                    (c = g.cells[h.index]) && (c.height = g.height),
                      (m = t.cells[h.index]) && (m.height = t.height);
                  }
                  return g;
                })(o, c, n, e);
                d(e, n, o, s), h(e, n, l, s), t(e, n, f, r, l, s);
              } else h(e, n, l, s), t(e, n, o, r, l, s);
            })(y, e, t, o, v, f);
          }),
          y.applyStyles(y.userStyles),
          ("lastPage" !== n.showFoot && "everyPage" !== n.showFoot) ||
            e.foot.forEach(function (t) {
              return d(y, e, t, f);
            }),
          r.addTableBorder(y, e, v, f),
          e.callEndPageHooks(y, f),
          (e.finalY = f.y),
          (t.lastAutoTable = e),
          (t.previousAutoTable = e),
          t.autoTable && (t.autoTable.previous = e),
          y.applyStyles(y.userStyles);
      }),
        (e.addPage = h);
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Column = e.Cell = e.Row = e.Table = void 0);
      var o = n(1),
        r = n(14),
        i = n(0),
        l = (function () {
          function t(t, e) {
            (this.pageNumber = 1),
              (this.pageCount = 1),
              (this.id = t.id),
              (this.settings = t.settings),
              (this.styles = t.styles),
              (this.hooks = t.hooks),
              (this.columns = e.columns),
              (this.head = e.head),
              (this.body = e.body),
              (this.foot = e.foot);
          }
          return (
            (t.prototype.getHeadHeight = function (t) {
              return this.head.reduce(function (e, n) {
                return e + n.getMaxCellHeight(t);
              }, 0);
            }),
            (t.prototype.getFootHeight = function (t) {
              return this.foot.reduce(function (e, n) {
                return e + n.getMaxCellHeight(t);
              }, 0);
            }),
            (t.prototype.allRows = function () {
              return this.head.concat(this.body).concat(this.foot);
            }),
            (t.prototype.callCellHooks = function (t, e, n, o, i, l) {
              for (var a = 0, s = e; a < s.length; a++) {
                var u =
                  !1 === (0, s[a])(new r.CellHookData(t, this, n, o, i, l));
                if (((n.text = Array.isArray(n.text) ? n.text : [n.text]), u))
                  return !1;
              }
              return !0;
            }),
            (t.prototype.callEndPageHooks = function (t, e) {
              t.applyStyles(t.userStyles);
              for (var n = 0, o = this.hooks.didDrawPage; n < o.length; n++) {
                (0, o[n])(new r.HookData(t, this, e));
              }
            }),
            (t.prototype.getWidth = function (t) {
              if ("number" == typeof this.settings.tableWidth)
                return this.settings.tableWidth;
              if ("wrap" === this.settings.tableWidth)
                return this.columns.reduce(function (t, e) {
                  return t + e.wrappedWidth;
                }, 0);
              var e = this.settings.margin;
              return t - e.left - e.right;
            }),
            t
          );
        })();
      e.Table = l;
      var a = (function () {
        function t(t, e, n, r, i) {
          void 0 === i && (i = !1),
            (this.height = 0),
            (this.raw = t),
            t instanceof o.HtmlRowInput &&
              ((this.raw = t._element), (this.element = t._element)),
            (this.index = e),
            (this.section = n),
            (this.cells = r),
            (this.spansMultiplePages = i);
        }
        return (
          (t.prototype.getMaxCellHeight = function (t) {
            var e = this;
            return t.reduce(function (t, n) {
              var o;
              return Math.max(
                t,
                (null === (o = e.cells[n.index]) || void 0 === o
                  ? void 0
                  : o.height) || 0
              );
            }, 0);
          }),
          (t.prototype.hasRowSpan = function (t) {
            var e = this;
            return (
              t.filter(function (t) {
                var n = e.cells[t.index];
                return !!n && n.rowSpan > 1;
              }).length > 0
            );
          }),
          (t.prototype.canEntireRowFit = function (t, e) {
            return this.getMaxCellHeight(e) <= t;
          }),
          (t.prototype.getMinimumRowHeight = function (t, e) {
            var n = this;
            return t.reduce(function (t, r) {
              var i = n.cells[r.index];
              if (!i) return 0;
              var l = (i.styles.fontSize / e.scaleFactor()) * o.FONT_ROW_RATIO,
                a = i.padding("vertical") + l;
              return a > t ? a : t;
            }, 0);
          }),
          t
        );
      })();
      e.Row = a;
      var s = (function () {
        function t(t, e, n) {
          var o, r;
          (this.contentHeight = 0),
            (this.contentWidth = 0),
            (this.wrappedWidth = 0),
            (this.minReadableWidth = 0),
            (this.minWidth = 0),
            (this.width = 0),
            (this.height = 0),
            (this.x = 0),
            (this.y = 0),
            (this.styles = e),
            (this.section = n),
            (this.raw = t);
          var i = t;
          null == t || "object" != typeof t || Array.isArray(t)
            ? ((this.rowSpan = 1), (this.colSpan = 1))
            : ((this.rowSpan = t.rowSpan || 1),
              (this.colSpan = t.colSpan || 1),
              (i =
                null !==
                  (r =
                    null !== (o = t.content) && void 0 !== o ? o : t.title) &&
                void 0 !== r
                  ? r
                  : t),
              t._element && (this.raw = t._element));
          var l = null != i ? "" + i : "";
          this.text = l.split(/\r\n|\r|\n/g);
        }
        return (
          (t.prototype.getTextPos = function () {
            var t, e;
            if ("top" === this.styles.valign) t = this.y + this.padding("top");
            else if ("bottom" === this.styles.valign)
              t = this.y + this.height - this.padding("bottom");
            else {
              var n = this.height - this.padding("vertical");
              t = this.y + n / 2 + this.padding("top");
            }
            if ("right" === this.styles.halign)
              e = this.x + this.width - this.padding("right");
            else if ("center" === this.styles.halign) {
              var o = this.width - this.padding("horizontal");
              e = this.x + o / 2 + this.padding("left");
            } else e = this.x + this.padding("left");
            return { x: e, y: t };
          }),
          (t.prototype.getContentHeight = function (t) {
            var e =
              (Array.isArray(this.text) ? this.text.length : 1) *
                ((this.styles.fontSize / t) * o.FONT_ROW_RATIO) +
              this.padding("vertical");
            return Math.max(e, this.styles.minCellHeight);
          }),
          (t.prototype.padding = function (t) {
            var e = i.parseSpacing(this.styles.cellPadding, 0);
            return "vertical" === t
              ? e.top + e.bottom
              : "horizontal" === t
              ? e.left + e.right
              : e[t];
          }),
          t
        );
      })();
      e.Cell = s;
      var u = (function () {
        function t(t, e, n) {
          (this.wrappedWidth = 0),
            (this.minReadableWidth = 0),
            (this.minWidth = 0),
            (this.width = 0),
            (this.dataKey = t),
            (this.raw = e),
            (this.index = n);
        }
        return (
          (t.prototype.getMaxCustomCellWidth = function (t) {
            for (var e = 0, n = 0, o = t.allRows(); n < o.length; n++) {
              var r = o[n].cells[this.index];
              r &&
                "number" == typeof r.styles.cellWidth &&
                (e = Math.max(e, r.styles.cellWidth));
            }
            return e;
          }),
          t
        );
      })();
      e.Column = u;
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.createTable = void 0);
      var o = n(2),
        r = n(8),
        i = n(15),
        l = n(1),
        a = n(3);
      function s(t, e, n, o, i, l) {
        var a = {};
        return e.map(function (e, s) {
          for (
            var u = 0, h = {}, c = 0, f = 0, p = 0, g = n;
            p < g.length;
            p++
          ) {
            var y = g[p];
            if (null == a[y.index] || 0 === a[y.index].left)
              if (0 === f) {
                var v = void 0,
                  m = {};
                "object" !=
                  typeof (v = Array.isArray(e)
                    ? e[y.index - c - u]
                    : e[y.dataKey]) ||
                  Array.isArray(v) ||
                  (m = (null == v ? void 0 : v.styles) || {});
                var b = d(t, y, s, i, o, l, m),
                  w = new r.Cell(v, b, t);
                (h[y.dataKey] = w),
                  (h[y.index] = w),
                  (f = w.colSpan - 1),
                  (a[y.index] = { left: w.rowSpan - 1, times: f });
              } else f--, c++;
            else a[y.index].left--, (f = a[y.index].times), u++;
          }
          return new r.Row(e, s, t, h);
        });
      }
      function u(t, e) {
        var n = {};
        return (
          t.forEach(function (t) {
            if (null != t.raw) {
              var o = (function (t, e) {
                if ("head" === t) {
                  if ("object" == typeof e) return e.header || e.title || null;
                  if ("string" == typeof e || "number" == typeof e) return e;
                } else if ("foot" === t && "object" == typeof e)
                  return e.footer;
                return null;
              })(e, t.raw);
              null != o && (n[t.dataKey] = o);
            }
          }),
          Object.keys(n).length > 0 ? n : null
        );
      }
      function d(t, e, n, o, r, i, s) {
        var u,
          d = l.getTheme(o);
        "head" === t
          ? (u = r.headStyles)
          : "body" === t
          ? (u = r.bodyStyles)
          : "foot" === t && (u = r.footStyles);
        var h = a.assign({}, d.table, d[t], r.styles, u),
          c = r.columnStyles[e.dataKey] || r.columnStyles[e.index] || {},
          f = "body" === t ? c : {},
          p =
            "body" === t && n % 2 == 0
              ? a.assign({}, d.alternateRow, r.alternateRowStyles)
              : {},
          g = l.defaultStyles(i),
          y = a.assign({}, g, h, p, f);
        return a.assign(y, s);
      }
      e.createTable = function (t, e) {
        var n = new o.DocHandler(t),
          l = (function (t, e) {
            var n = t.content,
              o = (function (t) {
                return t.map(function (t, e) {
                  var n, o, i;
                  return (
                    (i =
                      "object" == typeof t &&
                      null !==
                        (o =
                          null !== (n = t.dataKey) && void 0 !== n
                            ? n
                            : t.key) &&
                      void 0 !== o
                        ? o
                        : e),
                    new r.Column(i, t, e)
                  );
                });
              })(n.columns);
            if (0 === n.head.length) {
              (i = u(o, "head")) && n.head.push(i);
            }
            if (0 === n.foot.length) {
              var i;
              (i = u(o, "foot")) && n.foot.push(i);
            }
            var l = t.settings.theme,
              a = t.styles;
            return {
              columns: o,
              head: s("head", n.head, o, a, l, e),
              body: s("body", n.body, o, a, l, e),
              foot: s("foot", n.foot, o, a, l, e),
            };
          })(e, n.scaleFactor()),
          a = new r.Table(e, l);
        return i.calculateWidths(n, a), n.applyStyles(n.userStyles), a;
      };
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.__drawTable = e.__createTable = e.applyPlugin = void 0);
      var o = n(11),
        r = n(6),
        i = n(7),
        l = n(9);
      function a(t) {
        o.default(t);
      }
      (e.applyPlugin = a),
        (e.default = function (t, e) {
          var n = r.parseInput(t, e),
            o = l.createTable(t, n);
          i.drawTable(t, o);
        }),
        (e.__createTable = function (t, e) {
          var n = r.parseInput(t, e);
          return l.createTable(t, n);
        }),
        (e.__drawTable = function (t, e) {
          i.drawTable(t, e);
        });
      try {
        a(n(16));
      } catch (t) {}
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = n(4),
        r = n(5),
        i = n(2),
        l = n(6),
        a = n(7),
        s = n(9);
      e.default = function (t) {
        (t.API.autoTable = function () {
          for (var t, e = [], n = 0; n < arguments.length; n++)
            e[n] = arguments[n];
          1 === e.length
            ? (t = e[0])
            : (console.error("Use of deprecated autoTable initiation"),
              ((t = e[2] || {}).columns = e[0]),
              (t.body = e[1]));
          var o = l.parseInput(this, t),
            r = s.createTable(this, o);
          return a.drawTable(this, r), this;
        }),
          (t.API.lastAutoTable = !1),
          (t.API.previousAutoTable = !1),
          (t.API.autoTable.previous = !1),
          (t.API.autoTableText = function (t, e, n, o) {
            r.default(t, e, n, o, this);
          }),
          (t.API.autoTableSetDefaults = function (t) {
            return i.DocHandler.setDefaults(t, this), this;
          }),
          (t.autoTableSetDefaults = function (t, e) {
            i.DocHandler.setDefaults(t, e);
          }),
          (t.API.autoTableHtmlToJson = function (t, e) {
            if ((void 0 === e && (e = !1), "undefined" == typeof window))
              return (
                console.error(
                  "Cannot run autoTableHtmlToJson in non browser environment"
                ),
                null
              );
            var n = new i.DocHandler(this),
              r = o.parseHtml(n, t, window, e, !1),
              l = r.head,
              a = r.body;
            return {
              columns: l[0].map(function (t) {
                return t.content;
              }),
              rows: a,
              data: a,
            };
          }),
          (t.API.autoTableEndPosY = function () {
            console.error(
              "Use of deprecated function: autoTableEndPosY. Use doc.lastAutoTable.finalY instead."
            );
            var t = this.lastAutoTable;
            return t && t.finalY ? t.finalY : 0;
          }),
          (t.API.autoTableAddPageContent = function (e) {
            return (
              console.error(
                "Use of deprecated function: autoTableAddPageContent. Use jsPDF.autoTableSetDefaults({didDrawPage: () => {}}) instead."
              ),
              t.API.autoTable.globalDefaults ||
                (t.API.autoTable.globalDefaults = {}),
              (t.API.autoTable.globalDefaults.addPageContent = e),
              this
            );
          }),
          (t.API.autoTableAddPage = function () {
            return (
              console.error(
                "Use of deprecated function: autoTableAddPage. Use doc.addPage()"
              ),
              this.addPage(),
              this
            );
          });
      };
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.parseCss = void 0);
      var o = n(0);
      function r(t, e) {
        var n = (function t(e, n) {
          var o = n(e);
          return "rgba(0, 0, 0, 0)" === o ||
            "transparent" === o ||
            "initial" === o ||
            "inherit" === o
            ? null == e.parentElement
              ? null
              : t(e.parentElement, n)
            : o;
        })(t, e);
        if (!n) return null;
        var o = n.match(
          /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d*))?\)$/
        );
        if (!o || !Array.isArray(o)) return null;
        var r = [parseInt(o[1]), parseInt(o[2]), parseInt(o[3])];
        return 0 === parseInt(o[4]) || isNaN(r[0]) || isNaN(r[1]) || isNaN(r[2])
          ? null
          : r;
      }
      e.parseCss = function (t, e, n, i, l) {
        var a = {},
          s = r(e, function (t) {
            return l.getComputedStyle(t).backgroundColor;
          });
        null != s && (a.fillColor = s),
          null !=
            (s = r(e, function (t) {
              return l.getComputedStyle(t).color;
            })) && (a.textColor = s),
          null !=
            (s = r(e, function (t) {
              return l.getComputedStyle(t).borderTopColor;
            })) && (a.lineColor = s);
        var u = (function (t, e) {
          var n = [
              t.paddingTop,
              t.paddingRight,
              t.paddingBottom,
              t.paddingLeft,
            ],
            r = 96 / (72 / e),
            i = (parseInt(t.lineHeight) - parseInt(t.fontSize)) / e / 2,
            l = n.map(function (t) {
              return parseInt(t) / r;
            }),
            a = o.parseSpacing(l, 0);
          i > a.top && (a.top = i);
          i > a.bottom && (a.bottom = i);
          return a;
        })(i, n);
        u && (a.cellPadding = u);
        var d = parseInt(i.borderTopWidth || "");
        (d = d / (96 / 72) / n) && (a.lineWidth = d);
        var h = ["left", "right", "center", "justify"];
        -1 !== h.indexOf(i.textAlign) && (a.halign = i.textAlign),
          -1 !== (h = ["middle", "bottom", "top"]).indexOf(i.verticalAlign) &&
            (a.valign = i.verticalAlign);
        var c = parseInt(i.fontSize || "");
        isNaN(c) || (a.fontSize = c / (96 / 72));
        var f = (function (t) {
          var e = "";
          ("bold" === t.fontWeight ||
            "bolder" === t.fontWeight ||
            parseInt(t.fontWeight) >= 700) &&
            (e = "bold");
          ("italic" !== t.fontStyle && "oblique" !== t.fontStyle) ||
            (e += "italic");
          return e;
        })(i);
        f && (a.fontStyle = f);
        var p = (i.fontFamily || "").toLowerCase();
        return -1 !== t.indexOf(p) && (a.font = p), a;
      };
    },
    function (t, e, n) {
      "use strict";
      function o(t) {
        t.rowHeight
          ? (console.error(
              "Use of deprecated style rowHeight. It is renamed to minCellHeight."
            ),
            t.minCellHeight || (t.minCellHeight = t.rowHeight))
          : t.columnWidth &&
            (console.error(
              "Use of deprecated style columnWidth. It is renamed to cellWidth."
            ),
            t.cellWidth || (t.cellWidth = t.columnWidth));
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = function (t, e, n, r) {
          for (
            var i = function (e) {
                e &&
                  "object" != typeof e &&
                  console.error(
                    "The options parameter should be of type object, is: " +
                      typeof e
                  ),
                  void 0 !== e.extendWidth &&
                    ((e.tableWidth = e.extendWidth ? "auto" : "wrap"),
                    console.error(
                      "Use of deprecated option: extendWidth, use tableWidth instead."
                    )),
                  void 0 !== e.margins &&
                    (void 0 === e.margin && (e.margin = e.margins),
                    console.error(
                      "Use of deprecated option: margins, use margin instead."
                    )),
                  e.startY &&
                    "number" != typeof e.startY &&
                    (console.error("Invalid value for startY option", e.startY),
                    delete e.startY),
                  !e.didDrawPage &&
                    (e.afterPageContent ||
                      e.beforePageContent ||
                      e.afterPageAdd) &&
                    (console.error(
                      "The afterPageContent, beforePageContent and afterPageAdd hooks are deprecated. Use didDrawPage instead"
                    ),
                    (e.didDrawPage = function (n) {
                      t.applyStyles(t.userStyles),
                        e.beforePageContent && e.beforePageContent(n),
                        t.applyStyles(t.userStyles),
                        e.afterPageContent && e.afterPageContent(n),
                        t.applyStyles(t.userStyles),
                        e.afterPageAdd && n.pageNumber > 1 && n.afterPageAdd(n),
                        t.applyStyles(t.userStyles);
                    })),
                  [
                    "createdHeaderCell",
                    "drawHeaderRow",
                    "drawRow",
                    "drawHeaderCell",
                  ].forEach(function (t) {
                    e[t] &&
                      console.error(
                        'The "' +
                          t +
                          '" hook has changed in version 3.0, check the changelog for how to migrate.'
                      );
                  }),
                  [
                    ["showFoot", "showFooter"],
                    ["showHead", "showHeader"],
                    ["didDrawPage", "addPageContent"],
                    ["didParseCell", "createdCell"],
                    ["headStyles", "headerStyles"],
                  ].forEach(function (t) {
                    var n = t[0],
                      o = t[1];
                    e[o] &&
                      (console.error(
                        "Use of deprecated option " +
                          o +
                          ". Use " +
                          n +
                          " instead"
                      ),
                      (e[n] = e[o]));
                  }),
                  [
                    ["padding", "cellPadding"],
                    ["lineHeight", "rowHeight"],
                    "fontSize",
                    "overflow",
                  ].forEach(function (t) {
                    var n = "string" == typeof t ? t : t[0],
                      o = "string" == typeof t ? t : t[1];
                    void 0 !== e[n] &&
                      (void 0 === e.styles[o] && (e.styles[o] = e[n]),
                      console.error(
                        "Use of deprecated option: " +
                          n +
                          ", use the style " +
                          o +
                          " instead."
                      ));
                  });
                for (
                  var n = 0,
                    r = ["styles", "bodyStyles", "headStyles", "footStyles"];
                  n < r.length;
                  n++
                ) {
                  o(e[r[n]] || {});
                }
                for (
                  var i = e.columnStyles || {}, l = 0, a = Object.keys(i);
                  l < a.length;
                  l++
                ) {
                  o(i[a[l]] || {});
                }
              },
              l = 0,
              a = [e, n, r];
            l < a.length;
            l++
          ) {
            i(a[l]);
          }
        });
    },
    function (t, e, n) {
      "use strict";
      var o,
        r =
          (this && this.__extends) ||
          ((o = function (t, e) {
            return (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
              })(t, e);
          }),
          function (t, e) {
            function n() {
              this.constructor = t;
            }
            o(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.CellHookData = e.HookData = void 0);
      var i = function (t, e, n) {
        (this.table = e),
          (this.pageNumber = e.pageNumber),
          (this.pageCount = this.pageNumber),
          (this.settings = e.settings),
          (this.cursor = n),
          (this.doc = t.getDocument());
      };
      e.HookData = i;
      var l = (function (t) {
        function e(e, n, o, r, i, l) {
          var a = t.call(this, e, n, l) || this;
          return (
            (a.cell = o),
            (a.row = r),
            (a.column = i),
            (a.section = r.section),
            a
          );
        }
        return r(e, t), e;
      })(i);
      e.CellHookData = l;
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ellipsize = e.resizeColumns = e.calculateWidths = void 0);
      var o = n(0);
      function r(t, e, n) {
        for (
          var o = e,
            i = t.reduce(function (t, e) {
              return t + e.wrappedWidth;
            }, 0),
            l = 0;
          l < t.length;
          l++
        ) {
          var a = t[l],
            s = o * (a.wrappedWidth / i),
            u = a.width + s,
            d = n(a),
            h = u < d ? d : u;
          (e -= h - a.width), (a.width = h);
        }
        if ((e = Math.round(1e10 * e) / 1e10)) {
          var c = t.filter(function (t) {
            return !(e < 0) || t.width > n(t);
          });
          c.length && (e = r(c, e, n));
        }
        return e;
      }
      function i(t, e, n, r, i) {
        return t.map(function (t) {
          return (function (t, e, n, r, i) {
            var l = 1e4 * r.scaleFactor();
            if ((e = Math.ceil(e * l) / l) >= o.getStringWidth(t, n, r))
              return t;
            for (; e < o.getStringWidth(t + i, n, r) && !(t.length <= 1); )
              t = t.substring(0, t.length - 1);
            return t.trim() + i;
          })(t, e, n, r, i);
        });
      }
      (e.calculateWidths = function (t, e) {
        !(function (t, e) {
          var n = t.scaleFactor();
          e.allRows().forEach(function (r) {
            for (var i = 0, l = e.columns; i < l.length; i++) {
              var a = l[i],
                s = r.cells[a.index];
              if (s) {
                var u = e.hooks.didParseCell;
                e.callCellHooks(t, u, s, r, a, null);
                var d = s.padding("horizontal");
                s.contentWidth = o.getStringWidth(s.text, s.styles, t) + d;
                var h = o.getStringWidth(
                  s.text.join(" ").split(/\s+/),
                  s.styles,
                  t
                );
                if (
                  ((s.minReadableWidth = h + s.padding("horizontal")),
                  "number" == typeof s.styles.cellWidth)
                )
                  (s.minWidth = s.styles.cellWidth),
                    (s.wrappedWidth = s.styles.cellWidth);
                else if ("wrap" === s.styles.cellWidth)
                  (s.minWidth = s.contentWidth),
                    (s.wrappedWidth = s.contentWidth);
                else {
                  var c = 10 / n;
                  (s.minWidth = s.styles.minCellWidth || c),
                    (s.wrappedWidth = s.contentWidth),
                    s.minWidth > s.wrappedWidth &&
                      (s.wrappedWidth = s.minWidth);
                }
              }
            }
          }),
            e.allRows().forEach(function (t) {
              for (var n = 0, o = e.columns; n < o.length; n++) {
                var r = o[n],
                  i = t.cells[r.index];
                if (i && 1 === i.colSpan)
                  (r.wrappedWidth = Math.max(r.wrappedWidth, i.wrappedWidth)),
                    (r.minWidth = Math.max(r.minWidth, i.minWidth)),
                    (r.minReadableWidth = Math.max(
                      r.minReadableWidth,
                      i.minReadableWidth
                    ));
                else {
                  var l = (
                    e.styles.columnStyles[r.dataKey] ||
                    e.styles.columnStyles[r.index] ||
                    {}
                  ).cellWidth;
                  l &&
                    "number" == typeof l &&
                    ((r.minWidth = l), (r.wrappedWidth = l));
                }
                i &&
                  (i.colSpan > 1 && !r.minWidth && (r.minWidth = i.minWidth),
                  i.colSpan > 1 &&
                    !r.wrappedWidth &&
                    (r.wrappedWidth = i.minWidth));
              }
            });
        })(t, e);
        var n = [],
          l = 0;
        e.columns.forEach(function (t) {
          var o = t.getMaxCustomCellWidth(e);
          o ? (t.width = o) : ((t.width = t.wrappedWidth), n.push(t)),
            (l += t.width);
        });
        var a = e.getWidth(t.pageSize().width) - l;
        a &&
          (a = r(n, a, function (t) {
            return Math.max(t.minReadableWidth, t.minWidth);
          })),
          a &&
            (a = r(n, a, function (t) {
              return t.minWidth;
            })),
          (a = Math.abs(a)) > 0.1 / t.scaleFactor() &&
            ((a = a < 1 ? a : Math.round(a)),
            console.error(
              "Of the table content, " + a + " units width could not fit page"
            )),
          (function (t) {
            for (var e = t.allRows(), n = 0; n < e.length; n++)
              for (
                var o = e[n], r = null, i = 0, l = 0, a = 0;
                a < t.columns.length;
                a++
              ) {
                var s = t.columns[a];
                if ((l -= 1) > 1 && t.columns[a + 1])
                  (i += s.width), delete o.cells[s.index];
                else if (r) {
                  var u = r;
                  delete o.cells[s.index], (r = null), (u.width = s.width + i);
                } else {
                  if (!(u = o.cells[s.index])) continue;
                  if (((l = u.colSpan), (i = 0), u.colSpan > 1)) {
                    (r = u), (i += s.width);
                    continue;
                  }
                  u.width = s.width + i;
                }
              }
          })(e),
          (function (t, e) {
            for (
              var n = { count: 0, height: 0 }, o = 0, r = t.allRows();
              o < r.length;
              o++
            ) {
              for (var l = r[o], a = 0, s = t.columns; a < s.length; a++) {
                var u = s[a],
                  d = l.cells[u.index];
                if (d) {
                  e.applyStyles(d.styles, !0);
                  var h = d.width - d.padding("horizontal");
                  "linebreak" === d.styles.overflow
                    ? (d.text = e.splitTextToSize(
                        d.text,
                        h + 1 / e.scaleFactor(),
                        { fontSize: d.styles.fontSize }
                      ))
                    : "ellipsize" === d.styles.overflow
                    ? (d.text = i(d.text, h, d.styles, e, "..."))
                    : "hidden" === d.styles.overflow
                    ? (d.text = i(d.text, h, d.styles, e, ""))
                    : "function" == typeof d.styles.overflow &&
                      (d.text = d.styles.overflow(d.text, h)),
                    (d.contentHeight = d.getContentHeight(e.scaleFactor()));
                  var c = d.contentHeight / d.rowSpan;
                  d.rowSpan > 1 && n.count * n.height < c * d.rowSpan
                    ? (n = { height: c, count: d.rowSpan })
                    : n && n.count > 0 && n.height > c && (c = n.height),
                    c > l.height && (l.height = c);
                }
              }
              n.count--;
            }
          })(e, t),
          (function (t) {
            for (var e = {}, n = 1, o = t.allRows(), r = 0; r < o.length; r++)
              for (var i = o[r], l = 0, a = t.columns; l < a.length; l++) {
                var s = a[l],
                  u = e[s.index];
                if (n > 1) n--, delete i.cells[s.index];
                else if (u)
                  (u.cell.height += i.height),
                    (n = u.cell.colSpan),
                    delete i.cells[s.index],
                    u.left--,
                    u.left <= 1 && delete e[s.index];
                else {
                  var d = i.cells[s.index];
                  if (!d) continue;
                  if (((d.height = i.height), d.rowSpan > 1)) {
                    var h = o.length - r,
                      c = d.rowSpan > h ? h : d.rowSpan;
                    e[s.index] = { cell: d, left: c, row: i };
                  }
                }
              }
          })(e);
      }),
        (e.resizeColumns = r),
        (e.ellipsize = i);
    },
    function (e, n) {
      if (void 0 === t) {
        var o = new Error("Cannot find module 'undefined'");
        throw ((o.code = "MODULE_NOT_FOUND"), o);
      }
      e.exports = t;
    },
  ]);
});
