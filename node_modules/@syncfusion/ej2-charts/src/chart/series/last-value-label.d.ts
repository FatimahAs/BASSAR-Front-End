import { Chart } from '../chart';
import { Series } from './chart-series';
import { LastValueLabelSettingsModel } from './chart-series-model';
import { StockChart } from '../../stock-chart';
export declare class LastValueLabel {
    private chart;
    private svgRenderer;
    private padding;
    commonId: string;
    locationX: number;
    locationY: number;
    private elementID;
    constructor(chartInstance: Chart | StockChart['chart']);
    initPrivateVariables(chart: Chart): void;
    render(series: Series, chart: Chart, lastValueLabel: LastValueLabelSettingsModel, isExisting?: boolean): void;
    private renderLastValue;
    private animateLastValueLabel;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the seiresLabel for series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
