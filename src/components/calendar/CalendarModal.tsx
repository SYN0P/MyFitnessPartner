import React, { useEffect, useState } from 'react';
import { RxDatabase } from 'rxdb';
import { MemoDAO } from '../../db/DAO/memoDAO';
import { MemoDTO } from '../../db/DTO/memoDTO';
import CalendarEditableBox from './CalendarEditableBox';
import './CalendarModal.scss';
import EditableBoxList from './EditableBoxList';

type Props = {
    open: Boolean;
    close: () => void;
    header: string;
	db: RxDatabase;
    children: React.ReactNode;
}

function CalendarModal({open, close, header, db, children}: Props) {
	const [memoDTO, setMemoDTO] = useState<MemoDTO>(new MemoDTO());
	useEffect(()=>{
		memoDTO.setDB(db);
	}, [db]);
	async function handleAdd() {
		const memo : MemoDAO =
		{
			memoId: new Date().getTime(),
			memoDate: header,
			memoType: 'memo',
			memoValue: 'test',
		};
		await memoDTO.addMemo(memo);
	}
	return (
		<div className={ open ? 'openModal modal' : 'modal' }>
			{ open ? (
				<section>
					<header>
						{header}
						<button className="add" onClick={handleAdd}> &#43; </button>
						<button className="close" onClick={close}> &times; </button>
					</header>
					<main>
						{children}
						<EditableBoxList date={header} db={db}/>
					</main>
					<footer>
						<button className="close" onClick={close}> close </button>
					</footer>
				</section>
			) : null }
		</div>
	);
}

export default CalendarModal;