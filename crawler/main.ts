import Crawler from "crawler";
import { stringify } from "querystring";
import URL from "url";
import { appendFileSync } from "fs";

const c = new Crawler({
	maxConnections: 1,
	retries: 10,
});
const childrenC = new Crawler({
	maxConnections: 1,
	retries: 10,
});
let page = 1;
const data: any[] = [];
const baseUrl = "https://www.dayi.org.cn";
const list = baseUrl + "/list/5?";
const limit = 1071;
const queue: {
	uri: string;
	callback: (
		e: Error,
		res: Crawler.CrawlerRequestResponse,
		done: () => void
	) => void;
}[] = [];
const childrenQueue: {
	uri: string;
	callback: (
		e: Error,
		res: Crawler.CrawlerRequestResponse,
		done: () => void
	) => void;
}[] = [];
for (let i = 0; i < limit; i++) {
	queue.push({
		uri: list + stringify({ pageNo: page + i }),
		callback: (
			e: Error,
			res: Crawler.CrawlerRequestResponse,
			done: () => void
		) => {
			if (e) console.log(e);
			res.$(".name").each((i, el) => {
				const url = URL.resolve(
					res.request.uri.href,
					res.$(el).attr("href") || ""
				);
				childrenQueue.push({
					uri: url,
					callback: (
						e: Error,
						res: Crawler.CrawlerRequestResponse,
						done: () => void
					) => {
						if (e) console.log(e);
						const name = res.$(".name").first().text().trim();
						console.log(name, "<<<<<<");

						let alias = "";
						let xingWeiGuiJing = "";
						let category = "";
						const content: any[] = [name];
						const tmp: {
							name?: string;
							alias?: string;
							xingWeiGuiJing?: string;
							category?: string;
							content?: {
								itemName: string;
								itemContent: { label: string; labelContent: string }[];
							}[];
						} = {};
						res.$(".short-field-title").each((i, el) => {
							const shortFieldTitle = res.$(el);
							if (shortFieldTitle.text().includes("别名")) {
								alias = shortFieldTitle
									.nextAll()
									.filter(".short-field-content")
									.first()
									.text();
							}
							if (shortFieldTitle.text().includes("性味归经")) {
								xingWeiGuiJing = shortFieldTitle
									.nextAll()
									.filter(".short-field-content")
									.first()
									.text();
							}
							if (shortFieldTitle.text().includes("药材分类")) {
								category = shortFieldTitle
									.nextAll()
									.filter(".short-field-content")
									.first()
									.text();
							}
						});
						tmp.name = name;
						tmp.alias = alias;
						tmp.xingWeiGuiJing = xingWeiGuiJing;
						tmp.category = category;
						tmp.content = [];
						res.$(".long-item").each((i, el) => {
							const longItem = res.$(el);
							const oneTitle = longItem.children(".one-title");
							const itemName = oneTitle.text().trim();
							const itemContent: { label: string; labelContent: string }[] = [];
							longItem
								.children("div")
								.children("div")
								.children("div")
								.filter(".two-title")
								.each((i, el) => {
									itemContent.push({
										label: res.$(el).text().trim(),
										labelContent: res
											.$(el)
											.next(".field-content")
											.text()
											.trim(),
									});
								});
							tmp.content?.push({
								itemName,
								itemContent,
							});
						});
						content.push(tmp);
						data.push(content);
						done();
					},
				});
			});
			done();
		},
	});
}
c.queue(queue);
c.on("drain", () => {
	childrenC.queue(childrenQueue);
	childrenC.on("drain", () => {
		appendFileSync("./data.json", JSON.stringify(data));
	});
});
c.on("request", (opt) => {
	console.log(opt.uri);
});
// appendFileSync("./data.json", JSON.stringify(data));
