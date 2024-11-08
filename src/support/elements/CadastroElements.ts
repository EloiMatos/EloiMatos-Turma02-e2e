import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class CadastroElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getBotaoNovoCadastro(): Locator {
    return this.page.locator('#signin2');
  }

  getCampoNome(): Locator {
    return this.page.locator('#sign-username');
  }

  getSenha(): Locator {
    return this.page.locator('#sign-password');
  }

  getBotaoCadastrar(): Locator {
    return this.page.locator('button.btn.btn-primary', { hasText: 'Sign up' });
  }

  getCelular(): Locator {
    return this.page.locator('hrefch', { hasText: 'Samsung galaxy s6' });
  }

  getCarrinho(): Locator {
    return this.page.locator('hrefch', {
      hasText: 'button.btn.btn-success.btn-lg'
    });
  }

  async getMessageOK(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.page.on('dialog', async dialog => {
        try {
          const message = dialog.message();

          if (message === 'Sign up successful.') {
            await dialog.accept();
            resolve(message);
          } else if (message === 'Please fill out Username and Password.') {
            await dialog.accept();
            resolve(message);
          } else if (message === 'This user already exist.') {
            await dialog.accept();
            resolve(message);
          } else {
            reject(new Error(`Mensagem de alerta não esperada: ${message}`));
          }
        } catch (error) {
          reject(new Error(`Erro ao capturar o alerta: ${error}`));
        }
      });
    });
  }
}
