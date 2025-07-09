import { measureText, PathOption, Rect, TextOption } from '@syncfusion/ej2-svg-base';
import { RectOption, linear, textElement, appendChildElement, ChartLocation } from '../../common/utils/helper';
import { createElement, Animation, isNullOrUndefined } from '@syncfusion/ej2-base';
var LastValueLabel = /** @class */ (function () {
    function LastValueLabel(chartInstance) {
        this.padding = 6;
        this.chart = chartInstance;
    }
    LastValueLabel.prototype.initPrivateVariables = function (chart) {
        this.chart = chart;
        this.elementID = chart.element.id;
        this.svgRenderer = chart.renderer;
    };
    LastValueLabel.prototype.render = function (series, chart, lastValueLabel, isExisting) {
        if (!this.chart || !this.svgRenderer) {
            this.initPrivateVariables(chart);
        }
        if (!chart.enableCanvas && !series.lastValueLabelElement) {
            var groupID = this.elementID + "_LastValueLabel_Group_" + series.index;
            series.lastValueLabelElement = chart.renderer.createGroup({ id: groupID });
        }
        this.renderLastValue(series, chart, lastValueLabel, isExisting ? isExisting : false);
    };
    LastValueLabel.prototype.renderLastValue = function (series, chart, lastValueLabel, isExisting) {
        var isHighLowOpenClose = series.seriesType === 'HighLowOpenClose';
        var isHighLow = series.seriesType === 'HighLow';
        if (series.visiblePoints.length < 1) {
            return;
        }
        var lastPoint = series.visiblePoints[series.visiblePoints.length - 1];
        var yAxis = series.yAxis;
        var clipRect = series.clipRect;
        var labelId = this.elementID + "_LastValueLabel_" + series.index;
        var rawValue = isHighLowOpenClose ? parseFloat(lastPoint.close)
            : isHighLow ? parseFloat(lastPoint.low) : lastPoint.yValue;
        if (!(series.type === 'Candle'
            ? (lastPoint.symbolLocations && lastPoint.symbolLocations.length > 0)
            : isHighLowOpenClose
                ? (lastPoint.regions && lastPoint.regions.length > 0)
                : (lastPoint.symbolLocations && lastPoint.symbolLocations.length > 0))
            || (rawValue > yAxis.visibleRange.max || rawValue < yAxis.visibleRange.min)) {
            return;
        }
        var translateX = series.chart.requireInvertedAxis ? clipRect.x + (series.type === 'Candle'
            ? lastPoint.symbolLocations[1].x : isHighLowOpenClose ? (lastPoint.open <= lastPoint.close)
            ? lastPoint.regions[1].x : lastPoint.regions[2].x : lastPoint.symbolLocations[0].x) : clipRect.x;
        var translateY = series.chart.requireInvertedAxis ? (clipRect.y) : clipRect.y
            + (series.type === 'Candle' ? lastPoint.symbolLocations[1].y : isHighLowOpenClose
                ? (lastPoint.open <= lastPoint.close) ? lastPoint.regions[1].y : lastPoint.regions[2].y : lastPoint.symbolLocations[0].y);
        translateX = chart.requireInvertedAxis && (isHighLow || series.type === 'Candle') && !yAxis.isInversed
            ? translateX - lastPoint.regions[isHighLow ? 0 : 1].width : translateX;
        translateY = !chart.requireInvertedAxis && (isHighLow || series.type === 'Candle') && !yAxis.isInversed
            ? translateY + lastPoint.regions[isHighLow ? 0 : 1].height : translateY;
        var transformValue = 'translate(' + translateX + ',' + translateY + ')';
        var previousTransform = series.lastValueLabelElement ? series.lastValueLabelElement.getAttribute('transform') : null;
        var labelFormat = yAxis.labelFormat;
        var formattedRawValue = rawValue.toString();
        if (!(labelFormat && labelFormat.indexOf('n') > -1)) {
            formattedRawValue = (rawValue % 1 === 0)
                ? rawValue.toFixed(0)
                : (rawValue.toFixed(2).slice(-1) === '0'
                    ? rawValue.toFixed(1)
                    : rawValue.toFixed(2));
        }
        var lastLabeltext = labelFormat && labelFormat.match('{value}') !== null
            ? labelFormat.replace('{value}', yAxis.format(parseFloat(formattedRawValue)))
            : yAxis.format(parseFloat(formattedRawValue));
        var style = lastValueLabel.font;
        var size = measureText(lastLabeltext, style, this.chart.themeStyle.crosshairLabelFont);
        var labelWidth = size.width + this.padding * 2;
        var labelHeight = size.height + this.padding * 2;
        var baseValue = chart.requireInvertedAxis ? (chart.enableCanvas ? yAxis.rect.y : yAxis.rect.y - translateY)
            : (chart.enableCanvas ? yAxis.rect.x : yAxis.rect.x - translateX);
        var tickSize = yAxis.tickPosition === 'Outside' ? yAxis.majorTickLines.height : 0;
        var axisLabelPadding = yAxis.labelPadding;
        var borderWidth = lastValueLabel.border.width * 2;
        var labelSize = chart.requireInvertedAxis ? yAxis.maxLabelSize.height : yAxis.maxLabelSize.width;
        var isOutside = yAxis.labelPosition === 'Outside';
        var isOpposed = chart.enableRtl && !chart.requireInvertedAxis ? !yAxis.opposedPosition : yAxis.opposedPosition;
        var labelX = chart.requireInvertedAxis ? (chart.enableCanvas ? translateX : 0) - labelWidth / 2 : isOutside
            ? baseValue + (isOpposed
                ? axisLabelPadding + tickSize - borderWidth
                : -(axisLabelPadding + tickSize + borderWidth + labelSize))
            : baseValue + (isOpposed
                ? -(labelWidth)
                : 0);
        var labelY = chart.requireInvertedAxis ? isOutside
            ? baseValue + (isOpposed
                ? -(labelHeight + axisLabelPadding + tickSize)
                : (axisLabelPadding + tickSize + borderWidth))
            : baseValue + (isOpposed
                ? 0
                : -(labelHeight)) : (chart.enableCanvas ? translateY : 0) - labelHeight / 2;
        labelX = Math.max(-translateX + borderWidth, Math.min(labelX, chart.availableSize.width - labelWidth - borderWidth - translateX));
        labelY = Math.max(-translateY + borderWidth, Math.min(labelY, chart.availableSize.height - labelHeight - borderWidth - translateY));
        var labelRect = new Rect(labelX, labelY, labelWidth, labelHeight);
        chart.lastValueLabelCollections.push(labelRect);
        var background = this.chart.renderer.drawRectangle(new RectOption(this.elementID + "_LastValueLabel_Background_" + series.index, lastValueLabel.background || chart.themeStyle.crosshairFill, { width: lastValueLabel.border.width || 1, color: lastValueLabel.border.color }, 1, labelRect, lastValueLabel.rx, lastValueLabel.ry));
        appendChildElement(this.chart.enableCanvas, series.lastValueLabelElement, background, this.chart.redraw);
        var lineStartY = chart.requireInvertedAxis ? (chart.enableCanvas ? translateY : 0)
            + (isOpposed ? clipRect.height : 0) : chart.enableCanvas ? translateY : 0;
        var lineStartX = chart.requireInvertedAxis ? chart.enableCanvas ? translateX : 0
            : (isOpposed ? chart.enableCanvas ? translateX : 0 : chart.enableCanvas ? translateX
                + clipRect.width : clipRect.width);
        var lineEndX = chart.requireInvertedAxis ? chart.enableCanvas ? translateX : 0
            : isOpposed ? labelX : labelX + labelWidth;
        var lineEndY = chart.requireInvertedAxis ? (isOpposed ? (labelY + labelHeight)
            : labelY) : chart.enableCanvas ? translateY : 0;
        var linePath = "M " + lineStartX + " " + lineStartY + " L " + lineEndX + " " + lineEndY;
        var line = this.chart.renderer.drawPath(new PathOption(this.elementID + "_LastValueLine_" + series.index, 'none', lastValueLabel.lineWidth || 1, lastValueLabel.lineColor || chart.themeStyle.crosshairLine, 1, lastValueLabel.dashArray || '', linePath));
        appendChildElement(this.chart.enableCanvas, series.lastValueLabelElement, line, this.chart.redraw);
        textElement(this.chart.renderer, new TextOption(labelId, labelRect.x + labelRect.width / 2, (labelRect.y + labelRect.height / 2 + size.height * 0.35), 'middle', lastLabeltext), style, style.color || chart.themeStyle.crosshairLabelFont.color, series.lastValueLabelElement, false, chart.redraw, false, false, null, null, null, null, chart.enableCanvas, null, this.chart.themeStyle.crosshairLabelFont, new ChartLocation(labelRect.x + labelRect.width / 2, (labelRect.y + labelRect.height / 2 + size.height * 0.35)));
        if (!this.chart.enableCanvas && isExisting && previousTransform && this.chart.enableAnimation) {
            this.animateLastValueLabel(series.lastValueLabelElement, previousTransform, translateX, translateY, series.chart.duration);
        }
        else if (!this.chart.enableCanvas) {
            series.lastValueLabelElement.setAttribute('transform', transformValue);
            series.lastValueLabelElement.setAttribute('visibility', (chart.stockChart ? chart.stockChart.initialRender : chart.animateSeries) && series.animation.enable ? 'hidden' : 'visible');
        }
    };
    LastValueLabel.prototype.animateLastValueLabel = function (element, previousTransform, targetX, targetY, animateDuration) {
        var transform = previousTransform;
        var transformValues = transform.split(/[(),\s]+/);
        var existingTranslateX = parseFloat(transformValues[1]) || 0;
        var existingTranslateY = parseFloat(transformValues[2]) || 0;
        var duration = 500;
        if (!isNullOrUndefined(animateDuration)) {
            duration = animateDuration;
        }
        new Animation({}).animate(createElement('div'), {
            duration: duration,
            progress: function (args) {
                var calculatedTranslateY = linear(args.timeStamp, existingTranslateY, targetY - existingTranslateY, args.duration);
                var calculatedTranslateX = linear(args.timeStamp, existingTranslateX, targetX - existingTranslateX, args.duration);
                var transformValue = 'translate(' + calculatedTranslateX + ',' + calculatedTranslateY + ')';
                element.setAttribute('transform', transformValue);
            },
            end: function () {
                var transformValue = 'translate(' + targetX + ',' + targetY + ')';
                element.setAttribute('transform', transformValue);
            }
        });
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    LastValueLabel.prototype.getModuleName = function () {
        // Returns the module name
        return 'LastValueLabel';
    };
    /**
     * To destroy the seiresLabel for series.
     *
     * @returns {void}
     * @private
     */
    LastValueLabel.prototype.destroy = function () {
        // Destroy method performed here
    };
    return LastValueLabel;
}());
export { LastValueLabel };
