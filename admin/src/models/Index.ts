export interface ArticleState {
	/**
	 * id
	 */
	id?: number
	/**
	 * 文章标题
	 */
	title: string
	/**
	 * 文章摘要
	 */
	abstract: string
	/**
	 * 文章缩略图
	 */
	preview_img: string
	/**
	 * 作者
	 */
	author?: any
	/**
	 * 排序号
	 */
	order_by?: any
	/**
	 * 富文本内容
	 */
	rich_text?: string
	/**
	 * 文章状态
	 */
	status: number
}
