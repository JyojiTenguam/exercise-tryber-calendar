const decemberDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

before(() => {
  cy.configureLayoutInspector({
    excludePadding: true,
    threshold: 5,
  });
});

const fail = () => {
  it("Este teste ainda não foi implementado!", () => {
    expect(true).to.eq(false);
  })
}

describe('Desafio Técnico: Calendário Tryber', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  describe('1 - Crie um calendário dinamicamente', () => {
    it('A tag `<ul>` deve conter o `id` `"days"`', () => {
      cy.get('ul#days').should('be.visible');
    });

    it('Os dias devem estar contidos em uma tag `<li>`, e todos devem ter a classe `day`. Ex: `<li class="day">3</li>`', () => {
      cy.get('li.day').should('have.length', decemberDaysList.length);
    });

    it('Os dias 24, 25 e 31 são feriados e, além da classe `day`, devem conter também a classe `holiday`. Ex: `<li class="day holiday">24</li>`', () => {
      ['24', '25', '31'].forEach((day) => {
        cy.get('li.day.holiday').contains(day);
      })
    });

    it('Os dias 4, 11, 18 e 25 são sextas-feiras. Eles devem conter a classe `day` e a classe `friday`. Ex: `<li class="day friday">4</li>`', () => {
      ['4', '11', '18', '25'].forEach((day) => {
        cy.get('li.day.friday').contains(day);
      })
    });
  });

  describe('2 - Implemente uma função que muda a cor de fundo dos dias que possuem a classe `"holiday"`', () => {
    it('Ao clicar no botão "Feriados", a cor de fundo dos dias que possuem a classe "holiday" deve mudar', () => {
      cy.get('#btn-holiday').click();
      cy.get('.holiday').should('not.have.css', 'background-color', 'rgb(238, 238, 238)');
    });

    it('Ao clicar novamente no botão "Feriados", a cor de fundo dos dias que possuem a classe "holiday" deve voltar ao normal', () => {
      cy.get('#btn-holiday').click().click();
      cy.get('.holiday').should('have.css', 'background-color', 'rgb(238, 238, 238)');
    });
  });

  describe('3 - Implemente uma função que modifica o texto exibido nos dias que são Sexta-feira', () => {
    it('Ao clicar no botão "Sexta-feira", o texto dos dias que são sexta-feira deve mudar', () => {
      cy.get('#btn-friday').click();
      cy.get('.friday').each((friday) => {
        expect(isNaN(friday.text())).to.eq(true);
      });
    });

    it('Ao clicar novamente no botão "Sexta-feira", o texto retoma ao normal', () => {
      cy.get('#btn-friday').click().click();
      cy.get('.friday').each((friday) => {
        expect(isNaN(friday.text())).to.eq(false);
      });
    });
  });

  describe('4 - Implemente duas funções que criem um efeito de "zoom"', () => {
    it('Ao passar o mouse sobre um dia do calendário, o texto desse dia deve aumentar', () => {
      cy.get('li.day').first().realHover();
      cy.get('li.day').first().should('have.css', 'font-size', '30px');
    });

    it('Ao tirar o mouse sobre um dia do calendário, o texto desse dia deve retornar ao tamanho original', () => {
      cy.get('li.day').first().realHover();
      cy.get('li.day').first().should('have.css', 'font-size', '30px');
      cy.get('body').realHover({ position: 'topLeft' })
      cy.get('li.day').first();
      cy.get('li.day').first().should('have.css', 'font-size', '20px');
    });
  });

  describe('5 - Implemente uma função que selecione uma tarefa e atribua a cor da tarefa ao dia do calendário', () => {
    it('Ao clicar em uma tarefa, ela deve ser selecionada', () => {
      cy.get('.task').first().click();
      cy.get('.task').first().should('have.class', 'selected');
    });

    it('Ao clicar em um dia do mês no calendário, atribua a esse dia a cor da legenda da sua tarefa selecionada', () => {
      cy.get('.task').first().click();
      cy.get('li.day').first().click();
      cy.get('li.day').first().should('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('Ao clicar novamente no dia com a cor da legenda, a sua cor deverá voltar à configuração inicial `rgb(119,119,119)`', () => {
      cy.get('.task').first().click();
      cy.get('li.day').first().click().click();
      cy.get('li.day').first().should('have.css', 'color', 'rgb(119, 119, 119)');
    });

    it('Ao clicar novamente na tarefa, ela deve ser desmarcada', () => {
      cy.get('.task').first().click().click();
      cy.get('.task').first().should('not.have.class', 'selected');
    });
  });

  describe('6 - Vamos adicionar compromissos ao seu calendário?', () => {
    it("Ao digitar um compromisso na caixa de texto com id 'task-input', adiciona o item à lista com id 'task-list' ao clicar no botão com id 'btn-add'", () => {
      const text = '25 - Natal';
      cy.get('#task-input').type(text);
      cy.get('#btn-add').click();
      cy.get('#task-list > li').contains(text);
    });

    it("Se nenhum caractere for inserido no campo com id `'task-input'`, a função deve chamar um `alert` com uma mensagem de erro", () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('#btn-add').click().then(() => {
        expect(stub).to.be.called;
      });
    });

    it('Ao pressionar a tecla Enter o evento também deverá ser disparado', () => {
      const text = '25 - Natal';
      cy.get('#task-input').type(text).type('{enter}');
      cy.get('#task-list > li').contains(text);
    });

  });
});
