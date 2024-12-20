import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from '@headlessui/react';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, MutableRefObject, SetStateAction } from 'react';
import deleteAllApi from '../api/deleteAllApi';

type Props = {
	deleteAllOpen: boolean;
	setDeleteAllOpen: Dispatch<SetStateAction<boolean>>;
	cancelButtonRef: MutableRefObject<any>;
};

export default function DeleteAllModal({
	deleteAllOpen,
	setDeleteAllOpen,
	cancelButtonRef,
}: Props) {
	const router = useRouter();

	return (
		<Transition show={deleteAllOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={setDeleteAllOpen}
			>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<DialogTitle
												as="h3"
												className="text-base font-semibold leading-6 dark:text-gray-800"
											>
												一括削除
											</DialogTitle>
											<div className="mt-2">
												<p className="text-sm text-gray-500">
													すべてのデータを削除します。{<br />}
													削除したら元に戻せません。削除しますか？
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
										onClick={() => {
											deleteAllApi(router);
											setDeleteAllOpen(false);
										}}
									>
										削除
									</button>
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-800 sm:mt-0 sm:w-auto"
										onClick={() => setDeleteAllOpen(false)}
										ref={cancelButtonRef}
									>
										キャンセル
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
