import type { RouterInputs } from '@/utils/api';
import { FormWrapper } from "@/components/Form/wrapper";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Input } from '@/components/Form/input';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Form/button';
import { Textarea } from '@/components/Form/textarea';

type BroadcastFormPayload = Pick<RouterInputs['channels']['broadcast'], 'eventName' | 'eventData'>;
type BroadcastFormProps = {
  onSubmit: (val: BroadcastFormPayload) => Promise<void>;
};

export const BroadcastForm = ({ onSubmit }: BroadcastFormProps) => {
  const [error, setError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<BroadcastFormPayload>();

  const submit = async (values: BroadcastFormPayload) => {
    try {
      setError('');
      await onSubmit(values);
    } catch (error) {
      console.error('Failed to broadcast', error);
      setError((error as Error).message);
    }
  };

  return (
    <FormWrapper fullWidth onSubmit={handleSubmit(submit)}>
      {!!error && <Alert
        title="Failed to broadcast event."
        description={error}
      />}
      <Input
        label="Event Name"
        placeholder="config-update"
        error={errors?.eventName}
        {...register('eventName', {
          required: 'An event name is required.',
          minLength: {
            value: 3,
            message: 'Event name must be longer than 3 characters.'
          }
        })}
      />
      <Textarea label="Event Data" placeholder={`{ "data": "new" }`} error={errors.eventData} {...register('eventData', {
        required: 'Event data is required.',
        minLength: {
          value: 3,
          message: 'Event data must be longer than 3 characters.'
        }
      })} />
      <Button isPending={isSubmitting}>
        Broadcast
      </Button>
    </FormWrapper>
  )
}
