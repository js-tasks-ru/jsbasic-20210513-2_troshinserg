let calculator = {
  read(a, b) {
    this.a = a;
    this.b = b;
  },
  sum(a, b) {
    return this.a + this.b || false;
  },
  mul(a, b) {
    return this.a * this.b || false;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
