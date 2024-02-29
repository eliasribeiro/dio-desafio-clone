import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { api } from '../../../services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const schema = yup.object({
    email: yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
    password: yup.string().min(3, 'No mínimo 3 caracteres!').required('Campo obrigatório!')
}).required();


const Login = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    console.log(isValid.errors);


    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}&password=${formData.password}`);

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
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="E-mail" errorMessage={errors?.email?.message} leftIcon={<MdEmail />} name="email" control={control} />
                        <Input type="password" placeholder="Senha" errorMessage={errors?.password?.message} leftIcon={<MdLock />} name="password" control={control} />
                        <Button title="Entrar" variant="secondary" type="submit" />
                    </form>
                    <Row>
                        <EsqueciText href="#">Esqueci minha senha</EsqueciText>
                        <CriarText href="/usuario/cadastro">Criar Conta</CriarText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }