describe('Transações', () => {

    beforeEach(() => {
        cy.visit("https://devfinance-agilizei.netlify.app/")
    })
    
    it('Cadastrar uma entrada', () => {

        criarTransacao("Freela", 250)

        cy.get("tbody tr td.description").should("have.text", "Freela")
    })

    it('Cadastrar uma saída', () => {

        criarTransacao("Cinema", -35)

        cy.get("tbody tr td.description").should("have.text", "Cinema")
    })

    it("Excluir transação", () => {
        criarTransacao("Freela", 100)
        criarTransacao("Presente", 100)

        cy.contains(".description", "Freela")
            .parent()
            .find("img")
            .click()

            cy.get("tbody tr").should("have.length", 1)
    })
})

function criarTransacao(descricao, valor) {
    cy.contains("Nova Transação").click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-02-15")
    cy.contains('button', 'Salvar').click()
}