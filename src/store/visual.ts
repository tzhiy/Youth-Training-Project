/*
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:11
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-08 14:04:18
 * @Description: 图表状态管理
 */
import { defineStore } from 'pinia';
import { Annotation, StateCondition } from '@antv/g2plot';
import { ChartNameType, ChartOptionsType, ChartType } from '@/types/visual/charts';
import { WaterMarkOptionType } from '@/types/visual/config';

export const useVisualStore = defineStore('visual', {
	state: () => ({
		projectData: undefined as any,
		chartPicId: undefined as string | undefined,
		chartInstance: undefined as ChartType | undefined,
		chartType: undefined as ChartNameType | undefined,
		chartTitle: '' as string,
		backupChartOptions: undefined as ChartOptionsType | undefined,
		waterMarkUrl: undefined as string | undefined,
		waterMarkOptions: false as WaterMarkOptionType | false,
	}),
	getters: {
		chartOptions: state => state.chartInstance?.options,
	},
	actions: {
		initChart({ chartpic_id: chartPicId, chart_type: resChartType, chart_title: chartTitle, vis_config: visConfig, watermark_config: watermarkConfig }: any) {
			this.chartPicId = chartPicId;
			this.chartType = resChartType;
			this.chartTitle = chartTitle;
			this.backupChartOptions = JSON.parse(visConfig);
			this.waterMarkOptions = JSON.parse(watermarkConfig);
		},
		backupProjectData(data: any) {
			this.projectData = data;
		},
		render() {
			this.chartInstance?.render();
		},
		update(options: Partial<ChartOptionsType>) {
			this.chartInstance?.update(options);
		},
		changeData(data: Record<string, any>[]) {
			this.chartInstance?.changeData(data);
		},
		changeSize(width: number, height: number) {
			this.chartInstance?.changeSize(width, height);
		},
		destroy() {
			this.chartInstance?.destroy();
			this.chartInstance = undefined;
			this.chartType = undefined;
			this.chartTitle = '';
			this.waterMarkOptions = false;
			this.waterMarkUrl = undefined;
		},
		on(evt: string, callback: Function, once?: boolean | undefined) {
			this.chartInstance?.on(evt, callback, once);
		},
		off(evt: string, callback: Function) {
			this.chartInstance?.off(evt, callback);
		},
		addAnnotations(annotations: Annotation[]) {
			this.chartInstance?.addAnnotations(annotations);
		},
		removeAnnotations(annotations: ({ id: string } & Partial<Annotation>)[]) {
			this.chartInstance?.removeAnnotations(annotations);
		},
		setState(type: 'active' | 'inactive' | 'selected', condition: StateCondition, status?: boolean) {
			this.chartInstance?.setState(type, condition, status);
		},
		getStates() {
			return this.chartInstance?.getStates();
		},
		bindChartToStore(instance: ChartType) {
			this.chartInstance = instance;
		},
		changeWaterMark(options: WaterMarkOptionType | false, url: string | undefined) {
			this.waterMarkOptions = options;
			this.waterMarkUrl = url;
		},
	},
});
