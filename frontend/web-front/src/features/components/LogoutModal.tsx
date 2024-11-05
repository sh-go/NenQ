import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from '@headlessui/react';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, MutableRefObject, SetStateAction } from 'react';
import logoutUser from '../api/logoutUser';

type Props = {
	logoutOpen: boolean;
	setLogoutOpen: Dispatch<SetStateAction<boolean>>;
	cancelButtonRef: MutableRefObject<any>;
};

export default function LogoutModal({
	logoutOpen,
	setLogoutOpen,
	cancelButtonRef,
}: Props) {
	const router = useRouter();

	return (
		<Transition show={logoutOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={setLogoutOpen}
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
							<DialogPanel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg">
								<div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<DialogTitle
												as="h3"
												className="text-base font-semibold leading-6"
											>
												ログアウト
											</DialogTitle>
											<div className="mt-2">
												<p className="text-sm">
													ログインユーザーからログアウトしますか？
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
										onClick={() => {
											logoutUser(router);
											setLogoutOpen(false);
										}}
									>
										ログアウト
									</button>
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
										onClick={() => setLogoutOpen(false)}
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
