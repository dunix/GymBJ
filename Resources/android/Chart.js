window.Chart = function(context) {
    function calculateOffset(val, calculatedScale, scaleHop) {
        var outerValue = calculatedScale.steps * calculatedScale.stepValue;
        var adjustedValue = val - calculatedScale.graphMin;
        var scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
        return scaleHop * calculatedScale.steps * scalingFactor;
    }
    function animationLoop(config, drawScale, drawData, ctx) {
        function animateFrame() {
            var easeAdjustedAnimationPercent = config.animation ? CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
            clear(ctx);
            if (config.scaleOverlay) {
                drawData(easeAdjustedAnimationPercent);
                drawScale();
            } else {
                drawScale();
                drawData(easeAdjustedAnimationPercent);
            }
        }
        function animLoop() {
            percentAnimComplete += animFrameAmount;
            animateFrame();
            1 >= percentAnimComplete ? requestAnimFrame(animLoop) : "function" == typeof config.onAnimationComplete && config.onAnimationComplete();
        }
        var animFrameAmount = config.animation ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1, easingFunction = animationOptions[config.animationEasing], percentAnimComplete = config.animation ? 0 : 1;
        "function" != typeof drawScale && (drawScale = function() {});
        requestAnimFrame(animLoop);
    }
    function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
        function calculateOrderOfMagnitude(val) {
            return Math.floor(Math.log(val) / Math.LN10);
        }
        var graphMin, graphMax, graphRange, stepValue, numberOfSteps, valueRange, rangeOrderOfMagnitude;
        valueRange = maxValue - minValue;
        rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);
        graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
        graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
        graphRange = graphMax - graphMin;
        stepValue = Math.pow(10, rangeOrderOfMagnitude);
        numberOfSteps = Math.round(graphRange / stepValue);
        while (minSteps > numberOfSteps || numberOfSteps > maxSteps) if (minSteps > numberOfSteps) {
            stepValue /= 2;
            numberOfSteps = Math.round(graphRange / stepValue);
        } else {
            stepValue *= 2;
            numberOfSteps = Math.round(graphRange / stepValue);
        }
        var labels = [];
        populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);
        return {
            steps: numberOfSteps,
            stepValue: stepValue,
            graphMin: graphMin,
            labels: labels
        };
    }
    function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
        if (labelTemplateString) for (var i = 1; numberOfSteps + 1 > i; i++) labels.push(tmpl(labelTemplateString, {
            value: (graphMin + stepValue * i).toFixed(getDecimalPlaces(stepValue))
        }));
    }
    function Max(array) {
        return Math.max.apply(Math, array);
    }
    function Min(array) {
        return Math.min.apply(Math, array);
    }
    function Default(userDeclared, valueIfFalse) {
        return userDeclared ? userDeclared : valueIfFalse;
    }
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
        if (isNumber(minValue) && minValue > valueToCap) return minValue;
        return valueToCap;
    }
    function getDecimalPlaces(num) {
        return 0 != num % 1 ? num.toString().split(".")[1].length : 0;
    }
    function mergeChartConfig(defaults, userDefined) {
        var returnObj = {};
        for (var attrname in defaults) returnObj[attrname] = defaults[attrname];
        for (var attrname in userDefined) returnObj[attrname] = userDefined[attrname];
        return returnObj;
    }
    function tmpl(str, data) {
        var fn = /\W/.test(str) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML);
        return data ? fn(data) : fn;
    }
    var chart = this;
    var animationOptions = {
        linear: function(t) {
            return t;
        },
        easeInQuad: function(t) {
            return t * t;
        },
        easeOutQuad: function(t) {
            return -1 * t * (t - 2);
        },
        easeInOutQuad: function(t) {
            if (1 > (t /= .5)) return .5 * t * t;
            return -0.5 * (--t * (t - 2) - 1);
        },
        easeInCubic: function(t) {
            return t * t * t;
        },
        easeOutCubic: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1);
        },
        easeInOutCubic: function(t) {
            if (1 > (t /= .5)) return .5 * t * t * t;
            return .5 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function(t) {
            return t * t * t * t;
        },
        easeOutQuart: function(t) {
            return -1 * ((t = t / 1 - 1) * t * t * t - 1);
        },
        easeInOutQuart: function(t) {
            if (1 > (t /= .5)) return .5 * t * t * t * t;
            return -0.5 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function(t) {
            return 1 * (t /= 1) * t * t * t * t;
        },
        easeOutQuint: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
        },
        easeInOutQuint: function(t) {
            if (1 > (t /= .5)) return .5 * t * t * t * t * t;
            return .5 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function(t) {
            return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
        },
        easeOutSine: function(t) {
            return 1 * Math.sin(t / 1 * (Math.PI / 2));
        },
        easeInOutSine: function(t) {
            return -0.5 * (Math.cos(Math.PI * t / 1) - 1);
        },
        easeInExpo: function(t) {
            return 0 == t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
        },
        easeOutExpo: function(t) {
            return 1 == t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
        },
        easeInOutExpo: function(t) {
            if (0 == t) return 0;
            if (1 == t) return 1;
            if (1 > (t /= .5)) return .5 * Math.pow(2, 10 * (t - 1));
            return .5 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function(t) {
            if (t >= 1) return t;
            return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
        },
        easeOutCirc: function(t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
        },
        easeInOutCirc: function(t) {
            if (1 > (t /= .5)) return -0.5 * (Math.sqrt(1 - t * t) - 1);
            return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (0 == t) return 0;
            if (1 == (t /= 1)) return 1;
            p || (p = .3);
            if (Math.abs(1) > a) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - s) * 2 * Math.PI / p));
        },
        easeOutElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (0 == t) return 0;
            if (1 == (t /= 1)) return 1;
            p || (p = .3);
            if (Math.abs(1) > a) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            return a * Math.pow(2, -10 * t) * Math.sin((1 * t - s) * 2 * Math.PI / p) + 1;
        },
        easeInOutElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (0 == t) return 0;
            if (2 == (t /= .5)) return 1;
            p || (p = 1 * .3 * 1.5);
            if (Math.abs(1) > a) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            if (1 > t) return -.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - s) * 2 * Math.PI / p);
            return .5 * a * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - s) * 2 * Math.PI / p) + 1;
        },
        easeInBack: function(t) {
            var s = 1.70158;
            return 1 * (t /= 1) * t * ((s + 1) * t - s);
        },
        easeOutBack: function(t) {
            var s = 1.70158;
            return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
        },
        easeInOutBack: function(t) {
            var s = 1.70158;
            if (1 > (t /= .5)) return .5 * t * t * (((s *= 1.525) + 1) * t - s);
            return .5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        easeInBounce: function(t) {
            return 1 - animationOptions.easeOutBounce(1 - t);
        },
        easeOutBounce: function(t) {
            return 1 / 2.75 > (t /= 1) ? 1 * 7.5625 * t * t : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
        },
        easeInOutBounce: function(t) {
            if (.5 > t) return .5 * animationOptions.easeInBounce(2 * t);
            return .5 * animationOptions.easeOutBounce(2 * t - 1) + .5;
        }
    };
    var width = context.canvas.width;
    var height = context.canvas.height;
    if (window.devicePixelRatio) {
        context.canvas.style.width = width + "px";
        context.canvas.style.height = height + "px";
        context.canvas.height = height * window.devicePixelRatio;
        context.canvas.width = width * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    this.PolarArea = function(data, options) {
        chart.PolarArea.defaults = {
            scaleOverlay: true,
            scaleOverride: false,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleShowLine: true,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: true,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowLabelBackdrop: true,
            scaleBackdropColor: "rgba(255,255,255,0.75)",
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            animation: true,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            onAnimationComplete: null
        };
        var config = options ? mergeChartConfig(chart.PolarArea.defaults, options) : chart.PolarArea.defaults;
        return new PolarArea(data, config, context);
    };
    this.Radar = function(data, options) {
        chart.Radar.defaults = {
            scaleOverlay: false,
            scaleOverride: false,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleShowLine: true,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: false,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowLabelBackdrop: true,
            scaleBackdropColor: "rgba(255,255,255,0.75)",
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            angleShowLineOut: true,
            angleLineColor: "rgba(0,0,0,.1)",
            angleLineWidth: 1,
            pointLabelFontFamily: "'Arial'",
            pointLabelFontStyle: "normal",
            pointLabelFontSize: 12,
            pointLabelFontColor: "#666",
            pointDot: true,
            pointDotRadius: 3,
            pointDotStrokeWidth: 1,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animation: true,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        };
        var config = options ? mergeChartConfig(chart.Radar.defaults, options) : chart.Radar.defaults;
        return new Radar(data, config, context);
    };
    this.Pie = function(data, options) {
        chart.Pie.defaults = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            animation: true,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            onAnimationComplete: null
        };
        var config = options ? mergeChartConfig(chart.Pie.defaults, options) : chart.Pie.defaults;
        return new Pie(data, config, context);
    };
    this.Doughnut = function(data, options) {
        chart.Doughnut.defaults = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animation: true,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            onAnimationComplete: null
        };
        var config = options ? mergeChartConfig(chart.Doughnut.defaults, options) : chart.Doughnut.defaults;
        return new Doughnut(data, config, context);
    };
    this.Line = function(data, options) {
        chart.Line.defaults = {
            scaleOverlay: false,
            scaleOverride: false,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: true,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: true,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 2,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animation: true,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        };
        var config = options ? mergeChartConfig(chart.Line.defaults, options) : chart.Line.defaults;
        return new Line(data, config, context);
    };
    this.Bar = function(data, options) {
        chart.Bar.defaults = {
            scaleOverlay: false,
            scaleOverride: false,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: true,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1,
            animation: true,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        };
        var config = options ? mergeChartConfig(chart.Bar.defaults, options) : chart.Bar.defaults;
        return new Bar(data, config, context);
    };
    var clear = function(c) {
        c.clearRect(0, 0, width, height);
    };
    var PolarArea = function(data, config, ctx) {
        function calculateDrawingSizes() {
            maxSize = Min([ width, height ]) / 2;
            maxSize -= Max([ .5 * config.scaleFontSize, .5 * config.scaleLineWidth ]);
            labelHeight = 2 * config.scaleFontSize;
            if (config.scaleShowLabelBackdrop) {
                labelHeight += 2 * config.scaleBackdropPaddingY;
                maxSize -= 1.5 * config.scaleBackdropPaddingY;
            }
            scaleHeight = maxSize;
            labelHeight = Default(labelHeight, 5);
        }
        function drawScale() {
            for (var i = 0; calculatedScale.steps > i; i++) {
                if (config.scaleShowLine) {
                    ctx.beginPath();
                    ctx.arc(width / 2, height / 2, scaleHop * (i + 1), 0, 2 * Math.PI, true);
                    ctx.strokeStyle = config.scaleLineColor;
                    ctx.lineWidth = config.scaleLineWidth;
                    ctx.stroke();
                }
                if (config.scaleShowLabels) {
                    ctx.textAlign = "center";
                    ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
                    var label = calculatedScale.labels[i];
                    if (config.scaleShowLabelBackdrop) {
                        var textWidth = ctx.measureText(label).width;
                        ctx.fillStyle = config.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(Math.round(width / 2 - textWidth / 2 - config.scaleBackdropPaddingX), Math.round(height / 2 - scaleHop * (i + 1) - .5 * config.scaleFontSize - config.scaleBackdropPaddingY), Math.round(textWidth + 2 * config.scaleBackdropPaddingX), Math.round(config.scaleFontSize + 2 * config.scaleBackdropPaddingY));
                        ctx.fill();
                    }
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = config.scaleFontColor;
                    ctx.fillText(label, width / 2, height / 2 - scaleHop * (i + 1));
                }
            }
        }
        function drawAllSegments(animationDecimal) {
            var startAngle = -Math.PI / 2, angleStep = 2 * Math.PI / data.length, scaleAnimation = 1, rotateAnimation = 1;
            if (config.animation) {
                config.animateScale && (scaleAnimation = animationDecimal);
                config.animateRotate && (rotateAnimation = animationDecimal);
            }
            for (var i = 0; data.length > i; i++) {
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, scaleAnimation * calculateOffset(data[i].value, calculatedScale, scaleHop), startAngle, startAngle + rotateAnimation * angleStep, false);
                ctx.lineTo(width / 2, height / 2);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();
                if (config.segmentShowStroke) {
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.stroke();
                }
                startAngle += rotateAnimation * angleStep;
            }
        }
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i = 0; data.length > i; i++) {
                data[i].value > upperValue && (upperValue = data[i].value);
                lowerValue > data[i].value && (lowerValue = data[i].value);
            }
            var maxSteps = Math.floor(scaleHeight / (.66 * labelHeight));
            var minSteps = Math.floor(.5 * (scaleHeight / labelHeight));
            return {
                maxValue: upperValue,
                minValue: lowerValue,
                maxSteps: maxSteps,
                minSteps: minSteps
            };
        }
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;
        calculateDrawingSizes();
        valueBounds = getValueBounds();
        labelTemplateString = config.scaleShowLabels ? config.scaleLabel : null;
        if (config.scaleOverride) {
            calculatedScale = {
                steps: config.scaleSteps,
                stepValue: config.scaleStepWidth,
                graphMin: config.scaleStartValue,
                labels: []
            };
            populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth);
        } else calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
        scaleHop = maxSize / calculatedScale.steps;
        animationLoop(config, drawScale, drawAllSegments, ctx);
    };
    var Radar = function(data, config, ctx) {
        function drawAllDataPoints(animationDecimal) {
            var rotationDegree = 2 * Math.PI / data.datasets[0].data.length;
            ctx.save();
            ctx.translate(width / 2, height / 2);
            for (var i = 0; data.datasets.length > i; i++) {
                ctx.beginPath();
                ctx.moveTo(0, animationDecimal * -1 * calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop));
                for (var j = 1; data.datasets[i].data.length > j; j++) {
                    ctx.rotate(rotationDegree);
                    ctx.lineTo(0, animationDecimal * -1 * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop));
                }
                ctx.closePath();
                ctx.fillStyle = data.datasets[i].fillColor;
                ctx.strokeStyle = data.datasets[i].strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.fill();
                ctx.stroke();
                if (config.pointDot) {
                    ctx.fillStyle = data.datasets[i].pointColor;
                    ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                    ctx.lineWidth = config.pointDotStrokeWidth;
                    for (var k = 0; data.datasets[i].data.length > k; k++) {
                        ctx.rotate(rotationDegree);
                        ctx.beginPath();
                        ctx.arc(0, animationDecimal * -1 * calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop), config.pointDotRadius, 2 * Math.PI, false);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
                ctx.rotate(rotationDegree);
            }
            ctx.restore();
        }
        function drawScale() {
            var rotationDegree = 2 * Math.PI / data.datasets[0].data.length;
            ctx.save();
            ctx.translate(width / 2, height / 2);
            if (config.angleShowLineOut) {
                ctx.strokeStyle = config.angleLineColor;
                ctx.lineWidth = config.angleLineWidth;
                for (var h = 0; data.datasets[0].data.length > h; h++) {
                    ctx.rotate(rotationDegree);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, -maxSize);
                    ctx.stroke();
                }
            }
            for (var i = 0; calculatedScale.steps > i; i++) {
                ctx.beginPath();
                if (config.scaleShowLine) {
                    ctx.strokeStyle = config.scaleLineColor;
                    ctx.lineWidth = config.scaleLineWidth;
                    ctx.moveTo(0, -scaleHop * (i + 1));
                    for (var j = 0; data.datasets[0].data.length > j; j++) {
                        ctx.rotate(rotationDegree);
                        ctx.lineTo(0, -scaleHop * (i + 1));
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
                if (config.scaleShowLabels) {
                    ctx.textAlign = "center";
                    ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
                    ctx.textBaseline = "middle";
                    if (config.scaleShowLabelBackdrop) {
                        var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
                        ctx.fillStyle = config.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(Math.round(-textWidth / 2 - config.scaleBackdropPaddingX), Math.round(-scaleHop * (i + 1) - .5 * config.scaleFontSize - config.scaleBackdropPaddingY), Math.round(textWidth + 2 * config.scaleBackdropPaddingX), Math.round(config.scaleFontSize + 2 * config.scaleBackdropPaddingY));
                        ctx.fill();
                    }
                    ctx.fillStyle = config.scaleFontColor;
                    ctx.fillText(calculatedScale.labels[i], 0, -scaleHop * (i + 1));
                }
            }
            for (var k = 0; data.labels.length > k; k++) {
                ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize + "px " + config.pointLabelFontFamily;
                ctx.fillStyle = config.pointLabelFontColor;
                var opposite = Math.sin(rotationDegree * k) * (maxSize + config.pointLabelFontSize);
                var adjacent = Math.cos(rotationDegree * k) * (maxSize + config.pointLabelFontSize);
                ctx.textAlign = rotationDegree * k == Math.PI || 0 == rotationDegree * k ? "center" : rotationDegree * k > Math.PI ? "right" : "left";
                ctx.textBaseline = "middle";
                ctx.fillText(data.labels[k], opposite, -adjacent);
            }
            ctx.restore();
        }
        function calculateDrawingSizes() {
            maxSize = Min([ width, height ]) / 2;
            labelHeight = 2 * config.scaleFontSize;
            var labelLength = 0;
            for (var i = 0; data.labels.length > i; i++) {
                ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize + "px " + config.pointLabelFontFamily;
                var textMeasurement = ctx.measureText(data.labels[i]).width;
                textMeasurement > labelLength && (labelLength = textMeasurement);
            }
            maxSize -= Max([ labelLength, 1.5 * (config.pointLabelFontSize / 2) ]);
            maxSize -= config.pointLabelFontSize;
            maxSize = CapValue(maxSize, null, 0);
            scaleHeight = maxSize;
            labelHeight = Default(labelHeight, 5);
        }
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i = 0; data.datasets.length > i; i++) for (var j = 0; data.datasets[i].data.length > j; j++) {
                data.datasets[i].data[j] > upperValue && (upperValue = data.datasets[i].data[j]);
                lowerValue > data.datasets[i].data[j] && (lowerValue = data.datasets[i].data[j]);
            }
            var maxSteps = Math.floor(scaleHeight / (.66 * labelHeight));
            var minSteps = Math.floor(.5 * (scaleHeight / labelHeight));
            return {
                maxValue: upperValue,
                minValue: lowerValue,
                maxSteps: maxSteps,
                minSteps: minSteps
            };
        }
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;
        data.labels || (data.labels = []);
        calculateDrawingSizes();
        var valueBounds = getValueBounds();
        labelTemplateString = config.scaleShowLabels ? config.scaleLabel : null;
        if (config.scaleOverride) {
            calculatedScale = {
                steps: config.scaleSteps,
                stepValue: config.scaleStepWidth,
                graphMin: config.scaleStartValue,
                labels: []
            };
            populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth);
        } else calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
        scaleHop = maxSize / calculatedScale.steps;
        animationLoop(config, drawScale, drawAllDataPoints, ctx);
    };
    var Pie = function(data, config, ctx) {
        function drawPieSegments(animationDecimal) {
            var cumulativeAngle = -Math.PI / 2, scaleAnimation = 1, rotateAnimation = 1;
            if (config.animation) {
                config.animateScale && (scaleAnimation = animationDecimal);
                config.animateRotate && (rotateAnimation = animationDecimal);
            }
            for (var i = 0; data.length > i; i++) {
                var segmentAngle = rotateAnimation * data[i].value / segmentTotal * 2 * Math.PI;
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, scaleAnimation * pieRadius, cumulativeAngle, cumulativeAngle + segmentAngle);
                ctx.lineTo(width / 2, height / 2);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();
                if (config.segmentShowStroke) {
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.stroke();
                }
                cumulativeAngle += segmentAngle;
            }
        }
        var segmentTotal = 0;
        var pieRadius = Min([ height / 2, width / 2 ]) - 5;
        for (var i = 0; data.length > i; i++) segmentTotal += data[i].value;
        animationLoop(config, null, drawPieSegments, ctx);
    };
    var Doughnut = function(data, config, ctx) {
        function drawPieSegments(animationDecimal) {
            var cumulativeAngle = -Math.PI / 2, scaleAnimation = 1, rotateAnimation = 1;
            if (config.animation) {
                config.animateScale && (scaleAnimation = animationDecimal);
                config.animateRotate && (rotateAnimation = animationDecimal);
            }
            for (var i = 0; data.length > i; i++) {
                var segmentAngle = rotateAnimation * data[i].value / segmentTotal * 2 * Math.PI;
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, scaleAnimation * doughnutRadius, cumulativeAngle, cumulativeAngle + segmentAngle, false);
                ctx.arc(width / 2, height / 2, scaleAnimation * cutoutRadius, cumulativeAngle + segmentAngle, cumulativeAngle, true);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();
                if (config.segmentShowStroke) {
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.stroke();
                }
                cumulativeAngle += segmentAngle;
            }
        }
        var segmentTotal = 0;
        var doughnutRadius = Min([ height / 2, width / 2 ]) - 5;
        var cutoutRadius = doughnutRadius * (config.percentageInnerCutout / 100);
        for (var i = 0; data.length > i; i++) segmentTotal += data[i].value;
        animationLoop(config, null, drawPieSegments, ctx);
    };
    var Line = function(data, config, ctx) {
        function drawLines(animPc) {
            function yPos(dataSet, iteration) {
                return xAxisPosY - animPc * calculateOffset(data.datasets[dataSet].data[iteration], calculatedScale, scaleHop);
            }
            function xPos(iteration) {
                return yAxisPosX + valueHop * iteration;
            }
            for (var i = 0; data.datasets.length > i; i++) {
                ctx.strokeStyle = data.datasets[i].strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.beginPath();
                ctx.moveTo(yAxisPosX, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop));
                for (var j = 1; data.datasets[i].data.length > j; j++) config.bezierCurve ? ctx.bezierCurveTo(xPos(j - .5), yPos(i, j - 1), xPos(j - .5), yPos(i, j), xPos(j), yPos(i, j)) : ctx.lineTo(xPos(j), yPos(i, j));
                ctx.stroke();
                if (config.datasetFill) {
                    ctx.lineTo(yAxisPosX + valueHop * (data.datasets[i].data.length - 1), xAxisPosY);
                    ctx.lineTo(yAxisPosX, xAxisPosY);
                    ctx.closePath();
                    ctx.fillStyle = data.datasets[i].fillColor;
                    ctx.fill();
                } else ctx.closePath();
                if (config.pointDot) {
                    ctx.fillStyle = data.datasets[i].pointColor;
                    ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                    ctx.lineWidth = config.pointDotStrokeWidth;
                    for (var k = 0; data.datasets[i].data.length > k; k++) {
                        ctx.beginPath();
                        ctx.arc(yAxisPosX + valueHop * k, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop), config.pointDotRadius, 0, 2 * Math.PI, true);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }
        }
        function drawScale() {
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
            ctx.lineTo(width - widestXLabel / 2 - xAxisLength - 5, xAxisPosY);
            ctx.stroke();
            if (rotateLabels > 0) {
                ctx.save();
                ctx.textAlign = "right";
            } else ctx.textAlign = "center";
            ctx.fillStyle = config.scaleFontColor;
            for (var i = 0; data.labels.length > i; i++) {
                ctx.save();
                if (rotateLabels > 0) {
                    ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
                    ctx.rotate(-(rotateLabels * (Math.PI / 180)));
                    ctx.fillText(data.labels[i], 0, 0);
                    ctx.restore();
                } else ctx.fillText(data.labels[i], yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize + 3);
                ctx.beginPath();
                ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
                if (config.scaleShowGridLines && i > 0) {
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(yAxisPosX + i * valueHop, 5);
                } else ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
                ctx.stroke();
            }
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(yAxisPosX, xAxisPosY + 5);
            ctx.lineTo(yAxisPosX, 5);
            ctx.stroke();
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j = 0; calculatedScale.steps > j; j++) {
                ctx.beginPath();
                ctx.moveTo(yAxisPosX - 3, xAxisPosY - (j + 1) * scaleHop);
                if (config.scaleShowGridLines) {
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - (j + 1) * scaleHop);
                } else ctx.lineTo(yAxisPosX - .5, xAxisPosY - (j + 1) * scaleHop);
                ctx.stroke();
                config.scaleShowLabels && ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - (j + 1) * scaleHop);
            }
        }
        function calculateXAxisSize() {
            var longestText = 1;
            if (config.scaleShowLabels) {
                ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
                for (var i = 0; calculatedScale.labels.length > i; i++) {
                    var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                    longestText = measuredText > longestText ? measuredText : longestText;
                }
                longestText += 10;
            }
            xAxisLength = width - longestText - widestXLabel;
            valueHop = Math.floor(xAxisLength / (data.labels.length - 1));
            yAxisPosX = width - widestXLabel / 2 - xAxisLength;
            xAxisPosY = scaleHeight + config.scaleFontSize / 2;
        }
        function calculateDrawingSizes() {
            maxSize = height;
            ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
            widestXLabel = 1;
            for (var i = 0; data.labels.length > i; i++) {
                var textLength = ctx.measureText(data.labels[i]).width;
                widestXLabel = textLength > widestXLabel ? textLength : widestXLabel;
            }
            if (widestXLabel > width / data.labels.length) {
                rotateLabels = 45;
                if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
                    rotateLabels = 90;
                    maxSize -= widestXLabel;
                } else maxSize -= Math.sin(rotateLabels) * widestXLabel;
            } else maxSize -= config.scaleFontSize;
            maxSize -= 5;
            labelHeight = config.scaleFontSize;
            maxSize -= labelHeight;
            scaleHeight = maxSize;
        }
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i = 0; data.datasets.length > i; i++) for (var j = 0; data.datasets[i].data.length > j; j++) {
                data.datasets[i].data[j] > upperValue && (upperValue = data.datasets[i].data[j]);
                lowerValue > data.datasets[i].data[j] && (lowerValue = data.datasets[i].data[j]);
            }
            var maxSteps = Math.floor(scaleHeight / (.66 * labelHeight));
            var minSteps = Math.floor(.5 * (scaleHeight / labelHeight));
            return {
                maxValue: upperValue,
                minValue: lowerValue,
                maxSteps: maxSteps,
                minSteps: minSteps
            };
        }
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, rotateLabels = 0;
        calculateDrawingSizes();
        valueBounds = getValueBounds();
        labelTemplateString = config.scaleShowLabels ? config.scaleLabel : "";
        if (config.scaleOverride) {
            calculatedScale = {
                steps: config.scaleSteps,
                stepValue: config.scaleStepWidth,
                graphMin: config.scaleStartValue,
                labels: []
            };
            populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth);
        } else calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
        scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
        calculateXAxisSize();
        animationLoop(config, drawScale, drawLines, ctx);
    };
    var Bar = function(data, config, ctx) {
        function drawBars(animPc) {
            ctx.lineWidth = config.barStrokeWidth;
            for (var i = 0; data.datasets.length > i; i++) {
                ctx.fillStyle = data.datasets[i].fillColor;
                ctx.strokeStyle = data.datasets[i].strokeColor;
                for (var j = 0; data.datasets[i].data.length > j; j++) {
                    var barOffset = yAxisPosX + config.barValueSpacing + valueHop * j + barWidth * i + config.barDatasetSpacing * i + config.barStrokeWidth * i;
                    ctx.beginPath();
                    ctx.moveTo(barOffset, xAxisPosY);
                    ctx.lineTo(barOffset, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop) + config.barStrokeWidth / 2);
                    ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop) + config.barStrokeWidth / 2);
                    ctx.lineTo(barOffset + barWidth, xAxisPosY);
                    config.barShowStroke && ctx.stroke();
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
        function drawScale() {
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
            ctx.lineTo(width - widestXLabel / 2 - xAxisLength - 5, xAxisPosY);
            ctx.stroke();
            if (rotateLabels > 0) {
                ctx.save();
                ctx.textAlign = "right";
            } else ctx.textAlign = "center";
            ctx.fillStyle = config.scaleFontColor;
            for (var i = 0; data.labels.length > i; i++) {
                ctx.save();
                if (rotateLabels > 0) {
                    ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
                    ctx.rotate(-(rotateLabels * (Math.PI / 180)));
                    ctx.fillText(data.labels[i], 0, 0);
                    ctx.restore();
                } else ctx.fillText(data.labels[i], yAxisPosX + i * valueHop + valueHop / 2, xAxisPosY + config.scaleFontSize + 3);
                ctx.beginPath();
                ctx.moveTo(yAxisPosX + (i + 1) * valueHop, xAxisPosY + 3);
                ctx.lineWidth = config.scaleGridLineWidth;
                ctx.strokeStyle = config.scaleGridLineColor;
                ctx.lineTo(yAxisPosX + (i + 1) * valueHop, 5);
                ctx.stroke();
            }
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(yAxisPosX, xAxisPosY + 5);
            ctx.lineTo(yAxisPosX, 5);
            ctx.stroke();
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j = 0; calculatedScale.steps > j; j++) {
                ctx.beginPath();
                ctx.moveTo(yAxisPosX - 3, xAxisPosY - (j + 1) * scaleHop);
                if (config.scaleShowGridLines) {
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - (j + 1) * scaleHop);
                } else ctx.lineTo(yAxisPosX - .5, xAxisPosY - (j + 1) * scaleHop);
                ctx.stroke();
                config.scaleShowLabels && ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - (j + 1) * scaleHop);
            }
        }
        function calculateXAxisSize() {
            var longestText = 1;
            if (config.scaleShowLabels) {
                ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
                for (var i = 0; calculatedScale.labels.length > i; i++) {
                    var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                    longestText = measuredText > longestText ? measuredText : longestText;
                }
                longestText += 10;
            }
            xAxisLength = width - longestText - widestXLabel;
            valueHop = Math.floor(xAxisLength / data.labels.length);
            barWidth = (valueHop - 2 * config.scaleGridLineWidth - 2 * config.barValueSpacing - (config.barDatasetSpacing * data.datasets.length - 1) - (config.barStrokeWidth / 2 * data.datasets.length - 1)) / data.datasets.length;
            yAxisPosX = width - widestXLabel / 2 - xAxisLength;
            xAxisPosY = scaleHeight + config.scaleFontSize / 2;
        }
        function calculateDrawingSizes() {
            maxSize = height;
            ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
            widestXLabel = 1;
            for (var i = 0; data.labels.length > i; i++) {
                var textLength = ctx.measureText(data.labels[i]).width;
                widestXLabel = textLength > widestXLabel ? textLength : widestXLabel;
            }
            if (widestXLabel > width / data.labels.length) {
                rotateLabels = 45;
                if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
                    rotateLabels = 90;
                    maxSize -= widestXLabel;
                } else maxSize -= Math.sin(rotateLabels) * widestXLabel;
            } else maxSize -= config.scaleFontSize;
            maxSize -= 5;
            labelHeight = config.scaleFontSize;
            maxSize -= labelHeight;
            scaleHeight = maxSize;
        }
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i = 0; data.datasets.length > i; i++) for (var j = 0; data.datasets[i].data.length > j; j++) {
                data.datasets[i].data[j] > upperValue && (upperValue = data.datasets[i].data[j]);
                lowerValue > data.datasets[i].data[j] && (lowerValue = data.datasets[i].data[j]);
            }
            var maxSteps = Math.floor(scaleHeight / (.66 * labelHeight));
            var minSteps = Math.floor(.5 * (scaleHeight / labelHeight));
            return {
                maxValue: upperValue,
                minValue: lowerValue,
                maxSteps: maxSteps,
                minSteps: minSteps
            };
        }
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, barWidth, rotateLabels = 0;
        calculateDrawingSizes();
        valueBounds = getValueBounds();
        labelTemplateString = config.scaleShowLabels ? config.scaleLabel : "";
        if (config.scaleOverride) {
            calculatedScale = {
                steps: config.scaleSteps,
                stepValue: config.scaleStepWidth,
                graphMin: config.scaleStartValue,
                labels: []
            };
            populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth);
        } else calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
        scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
        calculateXAxisSize();
        animationLoop(config, drawScale, drawBars, ctx);
    };
    var requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1e3 / 60);
        };
    }();
    var cache = {};
};