import type { RouterInputs } from '@/utils/api';
import { FormWrapper } from "@/components/Form/wrapper";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Input } from '@/components/Form/input';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Form/button';
import { SwitchInput } from '@/components/Form/switch';

type CreateAppPayload = RouterInputs['apps']['create'];
type CreateAppFormProps = {
  onSubmit: (val: CreateAppPayload) => void;
};

export const CreateAppForm = ({ onSubmit }: CreateAppFormProps) => {
  const [error, setError] = useState<string>('');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateAppPayload>({
    defaultValues: {
      enabled: 0
    }
  });

  const submit = async (values: any) => {
    try {
      setError('');
      await onSubmit(values);
    } catch (error) {
      console.error('Failed to create app', error);
      setError((error as Error).message);
    }
  };

  return (
    <FormWrapper fullWidth onSubmit={handleSubmit(submit)}>
      {!!error && <Alert
        title="Failed to create application."
        description={error}
      />}
      <Input
        label="User Email"
        placeholder="joe@example.com"
        error={errors?.name}
        {...register('name', {
          required: 'An application name is required.',
          minLength: {
            value: 3,
            message: 'Application name must be longer than 3 characters.'
          }
        })}
      />
      <SwitchInput label="Enabled" name="enabled" control={control} />
      <Button isPending={isSubmitting}>
        Create Application
      </Button>
    </FormWrapper>
  )
}
