import ExclamationCircle from '@heroicons/react/24/outline/ExclamationCircleIcon';

type AlertProps = {
  title: string;
  label?: string;
  icon?: boolean;
  description?: string;
}

export const Alert = ({ title, label, description }: AlertProps) => {
  return (
    <div role="alert" className="relative border rounded-md px-5 py-4 bg-danger border-danger text-white dark:border-danger mb-8">
      <div className="flex items-center">
        <ExclamationCircle className='w-6 h-6 mr-2' />
        <div className={`${!description ? 'text-md' : 'text-lg'} font-medium`}>
          {title}
        </div>
        {!!label && <div className="px-2 py-1 ml-auto text-xs bg-white rounded-md text-slate-700">{label}</div>}
      </div>
      {!!description && <div className="mt-3">{description}</div>}
    </div>
  )
}