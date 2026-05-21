const { validateLogin } = require('../src/login');

describe('validateLogin()', () => {
  
  describe('Cenários de Erro (Negative Tests)', () => {
    
    test.each([
      ['', '123456', 'E-mail é obrigatório'],
      [null, '123456', 'E-mail é obrigatório'],
      ['usuario.com', '123456', 'E-mail inválido'],
      ['usuario@email.com', '', 'Senha é obrigatória'],
      ['usuario@email.com', '123', 'Senha deve ter no mínimo 6 caracteres'],
    ])('Deve retornar erro para email="%s" e senha="%s"', (email, password, expectedMsg) => {
      const result = validateLogin(email, password);
      expect(result).toEqual({
        success: false,
        message: expectedMsg
      });
    });

  });

  describe('Cenários de Sucesso (Positive Tests)', () => {
    
    test('Deve validar com sucesso para dados corretos', () => {
      const result = validateLogin('hudson@provedor.com', 'senha123');
      expect(result.success).toBe(true);
      expect(result.message).toBe('Login válido');
    });

  });

});