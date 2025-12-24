'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {

	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Input,
	Modal,
	ModalDialog,

} from '@mui/joy';
import { Lesson } from '@/types/dto/lesson';
import { Player } from '@/types/dto/player';
import { DataTable, DataTableColumn } from './create/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Pen, Trash } from 'lucide-react';


export default function Home() {
	const [lessons, setLessons] = useState<Lesson[]>([])
	const [players, setPlayers] = useState<Player[]>([])
	const [openLessonId, setOpenLessonId] = useState<number | null>(null)
	const [labelFilter, setLabelFilter] = useState('')
	const [lessonsLoading, setLessonsLoading] = useState(true);
	const [playersLoading, setPlayersLoading] = useState(false);


	useEffect(() => {
		setLessonsLoading(true);

		fetch('/api/lesson')
			.then(res => res.json())
			.then(data => {
				setLessons(data);
				setLessonsLoading(false);
			})
			.catch(() => setLessonsLoading(false));
	}, []);

	useEffect(() => {
		if (openLessonId === null) return;

		setPlayersLoading(true);

		fetch('/api/player')
			.then(res => res.json())
			.then(data => {
				setPlayers(data);
				setPlayersLoading(false);
			})
			.catch(() => setPlayersLoading(false));
	}, [openLessonId]);



	const columns: DataTableColumn<Lesson>[] = [
		{
			key: 'id',
			header: '#',
			render: (_value, _row, index) => index + 1
		},
		{
			key: 'id',
			header: 'ID'
		},
		{
			key: 'name',
			header: 'Name'
		},
		{
			key: 'label',
			header: 'Label',
			render: value =>
				typeof value === 'string' && value.trim() ? value : '—'
		},
		{
			key: 'id',
			header: 'Play',
			render: (_value, row) => (
				<div className="flex gap-2">
					<Link href={`/play/?id=${row.id}`} target="_blank">
						<Button size="sm">
							Play
						</Button>

					</Link>

					<Button
						variant="link"
						size="sm"
						onClick={() =>
							navigator.clipboard.writeText(
								`${window.location.host}/play/?id=${row.id}`
							)
						}
					>
						Copy
					</Button>

				</div>
			)
		},
		{
			key: 'id',
			header: 'Results',
			render: (_value, row) => (
				<Button
					size="sm"
					variant="outline"
					onClick={() => setOpenLessonId(row.id)}
				>
					View
				</Button>
			)
		},
		{
			key: 'id',
			header: 'Actions',
			render: (_value, row) => (
				<div className="flex gap-2">
					<Button
						size="sm"
						variant="ghost"
						onClick={() => {
							fetch(`/api/lesson/${row.id}`, { method: 'DELETE' })
								.then(() => window.location.reload())
						}}
					>
						<Trash className='text-destructive' />
					</Button>

					<Link href={`/create/?id=${row.id}`}>
						<Button variant="ghost" size="icon">
							<Pen />
						</Button>

					</Link>
				</div>
			)
		}
	]


	const filteredLessons = lessons.filter(lesson =>
		lesson.label.toLowerCase().includes(labelFilter.toLowerCase())
	)
	return (
		<main className="min-h-screen bg-sidebar overflow-hidden">
			<div
				className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
			>

				<header
					className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6"
				>

					<Input
						value={labelFilter}
						onChange={(e) => setLabelFilter(e.target.value)}
						placeholder="Search by label"
						className="w-full sm:w-64"
					/>


					<Link href="/create" className="w-full sm:w-auto">
						<Button className="w-full sm:w-auto">
							Create new lesson
						</Button>
					</Link>
				</header>


				<div className="overflow-x-auto">
		

						<DataTable<Lesson>
							columns={columns}
							data={filteredLessons}
							loading={lessonsLoading}
						/>
		

				</div>
			</div>

			<Modal open={openLessonId !== null} onClose={() => setOpenLessonId(null)}>
				<ModalDialog>
					<DialogTitle>Results</DialogTitle>
					<Divider />
					<DialogContent>
						<div className="space-y-2">
							{/* Header */}
							<div className="grid grid-cols-[1fr_80px_80px_80px] text-xs text-muted-foreground px-2">
								<span>Student</span>
								<span className="text-center">Right</span>
								<span className="text-center">Wrong</span>
								<span className="text-center">Retries</span>
							</div>

							<Divider />

							{/* Rows */}
							{players
								.filter(p => p.lessonID === openLessonId)
								.map(p => {
									const [right, wrong, retries] = p.result
										.replaceAll(';', '')
										.split(' ')
										.filter(v => !isNaN(Number(v)))
										.map(Number);

									return (
										<div
											key={p.id}
											className="grid grid-cols-[1fr_80px_80px_80px] items-center px-2 py-1 text-sm"
										>
											<span className="truncate">{p.name}</span>
											<span className="text-center">{right}</span>
											<span className="text-center">{wrong}</span>
											<span className="text-center">{retries}</span>
										</div>
									);
								})}
						</div>
					</DialogContent>

					<DialogActions>
						<Button onClick={() => setOpenLessonId(null)}>Close</Button>
					</DialogActions>
				</ModalDialog>
			</Modal>
		</main>


	);
}
