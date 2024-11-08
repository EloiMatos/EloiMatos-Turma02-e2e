import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import CadastroElements from '../elements/CadastroElements';
import BasePage from './BasePage';

export default class EcommercePage extends BasePage {
  readonly cadastroElements: CadastroElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.cadastroElements = new CadastroElements(page);
  }

  async preencherFormulario(): Promise<void> {
    await this.cadastroElements.getBotaoNovoCadastro().click();
    await this.cadastroElements
      .getCampoNome()
      .fill(faker.person.firstName() + faker.string.numeric(20));
    await this.cadastroElements.getSenha().fill(faker.string.alphanumeric(12));
    await this.cadastroElements.getBotaoCadastrar().click();
  }

  async preencherFormularioInvalido(): Promise<void> {
    await this.cadastroElements.getBotaoNovoCadastro().click();
    await this.cadastroElements
      .getCampoNome()
      .fill(faker.person.firstName() + faker.string.numeric(20));
    await this.cadastroElements.getBotaoCadastrar().click();
  }

  async preencherFormularioExistente(): Promise<void> {
    await this.cadastroElements.getBotaoNovoCadastro().click();
    const nomeExistente = 'usuario123';
    await this.cadastroElements.getCampoNome().fill(nomeExistente);
    await this.cadastroElements.getSenha().fill(faker.string.alphanumeric(12));
    await this.cadastroElements.getBotaoCadastrar().click();
  }

  async validarCadastro(): Promise<void> {
    const mensagemSucesso = await this.cadastroElements.getMessageOK();
    expect(mensagemSucesso).toBe('Sign up successful.');
  }

  async validarCadastroIncorreto(): Promise<void> {
    const mensagemSucesso = await this.cadastroElements.getMessageOK();
    expect(mensagemSucesso).toBe('Please fill out Username and Password.');
  }

  async validarCadastroExistente(): Promise<void> {
    const mensagemSucesso = await this.cadastroElements.getMessageOK();
    expect(mensagemSucesso).toBe('This user already exist.');
  }

  async validarCarrinho(): Promise<void> {
    await this.cadastroElements.getCelular().click();
    await this.cadastroElements.getCarrinho().click();
  }
}
