export interface Log {
	id: number;
	created_at: string;
	level: string;
	message: string;
	logger_id: string;
}

export type Logs = { logs: Log[] | [] };
