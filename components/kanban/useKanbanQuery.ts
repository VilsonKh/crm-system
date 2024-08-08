import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { ICard } from "./kanban.types";
import { KANBAN_DATA } from "./kanban.data";
import type { IDeal } from "~/types/deals.types";

export function useKanbanQuery() {
	return useQuery({
		queryKey: ["deals"],
		queryFn: () => {
			console.log("get data from db");
			return DB.listDocuments(DB_ID, COLLECTION_DEALS);
		},
		select(data) {
			const newBoard = KANBAN_DATA.map((column) => {
				return {
					...column,
					items: [] as ICard[],
				};
			});

			// @ts-ignore
			const deals = data.documents as unknown as IDeal[];

			for (const deal of deals) {
				const column = newBoard.find((col) => col.id === deal.status);
				if (column) {
					column.items.push({
						$createdAt: deal.$createdAt,
						id: deal.$id,
						name: deal.name,
						price: deal.price,
						companyName: deal.customer.name,
						status: column.name,
					});
				}
			}

			console.log("NewBoard:", newBoard);

			return newBoard;
		},
		staleTime: 0,
	});
}
