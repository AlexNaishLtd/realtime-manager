import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import XIcon from '@heroicons/react/24/outline/XMarkIcon';

import styles from './modal.module.css';

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  compact?: boolean;
};

export const Modal = ({ title, children, isOpen, onClose, compact }: ModalProps) => {
  return (
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog className="fixed inset-0 overflow-y-auto z-50" onClose={onClose}>
        <div className="flex items-center justify-center h-screen p-5">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className={styles.wrap} data-compact={compact}>
              <Dialog.Title as="h2" className="text-2xl font-semibold leading-5 mb-8">
                {title}
              </Dialog.Title>
              {children}
              <button className="absolute top-0 outline-none right-5" onClick={onClose}>
                <span className="sr-only">Close modal</span>
                <XIcon className="w-8 h-8" aria-hidden="true" />
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
