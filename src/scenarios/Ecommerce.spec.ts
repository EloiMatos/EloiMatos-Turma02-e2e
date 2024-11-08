import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import CadastroPage from '../support/pages/EcommercePage';

test.describe('Cadastro de usuário para DemoBlaze', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let cadastroPage: CadastroPage;

  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await page.goto(BASE_URL);
  });

  test('Preencher formulário de cadastro', async () => {
    await cadastroPage.preencherFormulario();
    await cadastroPage.validarCadastro();
  });

  test('Preencher formulário de cadastro incorretamente', async () => {
    await cadastroPage.preencherFormularioInvalido();
    await cadastroPage.validarCadastroIncorreto();
  });

  test('Preencher formulário de cadastro já em uso', async () => {
    await cadastroPage.preencherFormularioExistente();
    await cadastroPage.validarCadastroExistente();
  });

  test('Adicionar celular ao carrinho', async () => {
    await cadastroPage.validarCarrinho();
  });

  // Teste de compra comentado, caso queira desativar por enquanto
  // test('Efetuando compra de Samsung Galaxy S6', async () => {
  //   await cadastroPage.preencherFormulario();
  //   await cadastroPage.validarCadastro();
  // });
});
