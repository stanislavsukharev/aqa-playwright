// Создать тест сьют используя DDT (Data-Driven Testing - тестовые данные хранятся отдельно от тестового скрипта)
// подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import { test, expect } from '@playwright/test';

interface IRegistrationInvalidData {
  username: string;
  password: string;
  message: string;
}

const regInvalidTestData: IRegistrationInvalidData[] = [
  {
    username: '',
    password: 'Stasthepass1',
    message: 'Username is required'
  },
  {
    username: '  ',
    password: 'Stasthepass1',
    message: 'Prefix and postfix spaces are not allowed is username'
  },
  {
    username: 'xz',
    password: 'Stasthepass1',
    message: 'Username should contain at least 3 characters'
  },
  {
    username: ' stastheeboss',
    password: 'Stasthepass1',
    message: 'Prefix and postfix spaces are not allowed is username'
  },
  {
    username: 'stastheeboss ',
    password: 'Stasthepass1',
    message: 'Prefix and postfix spaces are not allowed is username'
  },
  {
    username: 'stastheeboss',
    password: '',
    message: 'Password is required'
  },
  {
    username: 'stastheeboss',
    password: 'sevench',
    message: 'Password should contain at least 8 characters'
  },
  {
    username: 'stastheeboss',
    password: 'NOCOUTRYFOROLDMEN111',
    message: 'Password should contain at least one character in lower case'
  }
];

test.describe('Negative Registration DDT', () => {
  for (const { username, password, message } of regInvalidTestData) {
    test(`should show error for username="${username}" and password="${password}"`, async ({ page }) => {
      await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
      await page.locator('#registerOnLogin').click();
      await page.locator('#userNameOnRegister').fill(username);
      await page.locator('#passwordOnRegister').fill(password);
      await page.locator('#register').click();
      await expect(page.locator('#errorMessageOnRegister')).toContainText(message);
    });
  }
});
