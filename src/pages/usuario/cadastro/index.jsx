import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { api } from '../../../services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, CriarText, Wrapper } from './styles';

const schema = yup.object({
    name: yup.string().min(5, 'No mínimo 5 caracteres!').matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Somente letras pode ser usadas.').required('Campo obrigatório!'),
    email: yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
    password: yup.string().min(3, 'No mínimo 3 caracteres!').required('Campo obrigatório!')
}).required();


const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    console.log(isValid.errors);

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.post(`/users`, formData);

            if (data.length && data[0].id) {
                navigate('/feed')
                return
            }

            alert('Usuário ou senha inválido')
        } catch (e) {
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                    e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Comece agora grátis</TitleLogin>
                    <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="name" type="text" placeholder="name" errorMessage={errors?.name?.message} leftIcon={<MdEmail />} control={control} />
                        <Input name="email" type="email" placeholder="E-mail" errorMessage={errors?.email?.message} leftIcon={<MdEmail />} control={control} />
                        <Input name="password" type="password" placeholder="Senha" errorMessage={errors?.password?.message} leftIcon={<MdLock />} control={control} />
                        <Button title="Entrar" variant="secondary" type="submit" />
                    </form>
                    <Column>
                        <CriarText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
                            <br />
                            <br />
                            Já tenho conta. <a href="/usuario/login">Fazer login</a>
                        </CriarText>
                    </Column>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }