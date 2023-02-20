import React from 'react';
import { checkUser } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {};

interface IvalidationForm {
  password: string;
}

const PasswordCheck = (props: Props) => {
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const { password } = data;
    const res = await checkUser(password);
    if (res.name) {
      navigate('/userinfo');
    }
  };

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, '8자 이상 16자 이하의 숫자 혹은 문자를 입력해 주세요.')
      .max(16, '8자 이상 16자 이하의 숫자 혹은 문자를 입력해 주세요.')
      .required('비밀번호를 입력해 주세요.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IvalidationForm>({ resolver: yupResolver(schema) });

  return (
    <div className='w-[300px] m-auto'>
      <h1 className='text-4xl font-bold text-center'>비밀번호 확인</h1>
      <form className='mt-8 text-center' onSubmit={handleSubmit(onSubmit)}>
        <input
          type='password'
          className='mwInput pl-6 w-full'
          placeholder='비밀번호를 입력해 주세요.'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-sm text-alert font-semibold pt-3'>
            {errors.password.message}
          </p>
        )}
        <button type='submit' className='mwBtn !w-full font-semibold mt-12'>
          확인
        </button>
      </form>
    </div>
  );
};

export default PasswordCheck;