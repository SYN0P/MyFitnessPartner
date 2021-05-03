import { RxDatabase } from 'rxdb';
import { RecordDAO } from '../DAO';

/* eslint-disable no-mixed-spaces-and-tabs */

class RecordDTO {
    private db: RxDatabase | null;

    constructor() {
    	this.db = null;
    }

    setDB(db : RxDatabase) {
    	this.db = db;
    }

    getDB() {
    	return this.db;
    }

    getNewId() {
    	return new Date().getTime();
    }

    async getCount() {
    	if (!this.db) return 0;
    	if (!this.db.collections.records) return 0;

    	const doc = await this.db.collections.records
    		.find()
    		.exec();

    	return doc.length;
    }

    async addRecord(data : RecordDAO) {
    	if (!this.db) return -1;
    	if (!this.db.collections.records) return -1;

    	const id = this.getNewId();

    	await this.db.collections.records.insert({
    		record_id: id,
    		record_time: data['time'],
    		routine_id: data['routineId'],
    		routine_name: data['routineName'],
    		record_exercises: [],
    	});

    	return id;
    }

    async getRecordById(id : Number) {
    	if (!this.db) return null;
    	if (!this.db.collections.records) return null;

    	const doc = await this.db.collections.records
    		.find()
    		.where('record_id')
    		.eq(id)
    		.exec();

    	if (doc.length <= 0) return null;

    	const result: RecordDAO = {
    		id: doc[0].get('record_id'),
    		time: doc[0].get('record_time'),
    		routineId: doc[0].get('routine_id'),
    		routineName: doc[0].get('routine_name'),
    	};

    	return result;
    }

    async getRecordsByOffset(offset : number, limit : number) {
    	if (!this.db) return [];
    	if (!this.db.collections.records) return [];

    	const doc = await this.db.collections.records
    		.find()
    		.skip(offset)
    		.limit(limit)
    		.exec();

    	const result : RecordDAO[] = [];
    	for (let i = 0; i < doc.length; i++) {
    		result.push({
    			id: doc[i].get('record_id'),
    			time: doc[i].get('record_time'),
    			routineId: doc[i].get('routine_id'),
    			routineName: doc[i].get('routine_name'),
    		});
    	}

    	return result;
    }
}

export { RecordDTO };