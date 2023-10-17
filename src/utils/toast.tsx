import CheckIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import toast from 'react-hot-toast';

export const success = (message: string) => {
  toast.custom((t) => (
    <div
      role="alert"
      className={`flex items-center font-semibold text-sm bg-white border-l-4 border-green-500 text-green-700 p-4 shadow rounded ${t.visible ? 'animate-enter' : 'animate-leave'
        }`}
    >
      <CheckIcon className="fill-current w-6 h-6 mr-4" />
      {message}
    </div>
  ));
};
