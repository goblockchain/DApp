# GoBlockchain DApp




## Aplicação descentralizada para utilização nas aulas da GO.

Projeto composto por DApps que estão sendo criadas de forma colaborativa pela comunidade Brasileira.

### O que esta sendo construido
- Identidade
- Token
- Reputação
- Conta corrente
- Certificado
- Pagamento

### Acesse nossa DApp [aqui](https://goblockchain.github.io/DApp/app/index.html) 


### Instalação local

Para navegar no projeto em seu computador, execute dentro da pasta `DApp` os seguintes comandos.

> Requisitos
>> Necessário a instalação do node.js em seu computador, [baixe aqui](https://nodejs.org/en/download/).


```
- npm install
- npm install -g bower
- bower install
- gulp dev
```



### Visão geral

O lastro do Token será o saldo na wallet da GoBlockchain. O saldo da wallet será proveniente de % do valor cobrado em cursos, valores recebidos por projetos vendidos a clientes e também valores depositados por investidores a título de doação para patrocinar alguma atividade .
1 ether = 1000 tokens

###Utilidade

O Token GBC inicialmente vai ser utilizado para
troca por descontos em cursos da GoBlockchain que podem variar de 1% a 100%, 
troca por descontos em serviços e produtos dos nossos parceiros, disponibilizados para GoBlockchain
direito a votação
Venda dos tokens para inscrições nos cursos
Descrição do contrato
O Token deve seguir o padrão ERC20 e as bibliotecas Ownership do OpenZeppelin, 
Interface ERC20
https://github.com/ethereum/eips/issues/20
Ownership
https://github.com/OpenZeppelin/openzeppelin-solidity/tree/master/contracts/ownership

Aconselhamos o uso da bibliotecas do OpenZeppelin para criação do token.
https://github.com/OpenZeppelin/openzeppelin-solidity/tree/master/contracts/token/ERC20

### Funcionalidades

Listar colaboradores
Transferir tokens
Reputação via Token
Importante vincular uma estrutura (struct) de reputação de acordo com a quantidade de tokens, essa reputação vai ser utilizado no futuro.
Visualizar a tabela Perfil no documento da Governança da GO.
Por exemplo, apenas membros especialistas podem validar as atividades enviadas para validação.

### Informações técnicas importantes
O token deve estar preparado para ser trocado outro token, assim garantimos que novas implementações do token possam ser trocas pelo token antigo.

### Valor do Token

O Token GBC é um asset que representa indiretamente a  Share (Participação) da DAO para seus detentores.
A  priori essas Shares são distribuídas conforme a contribuição de colaboradores , de forma que para cada Token GBC emitido requer uma “Prova de Trabalho Contribuição” para a DAO. 
Essa “Prova de Contribuição “ é recompensada em GBC de acordo com a tabela de recompensa vigente. Na figura abaixo podemos ver um exemplo de tabela de recompensas, vale ressaltar que essa tabela não é estática mas sim dinâmica podendo ser atualizada por meio  votação pelos participantes  da DAO.

Embora o GBC represente a Participação na DAO ele não é uma representação direta das Share , essas são calculadas de acordo com a Quantidade Total de GBC “Mineirados negociados” e a quantidade na carteira do colaborador, conforme a seguinte equação:

SharesColaborador = Saldo_GBC_Colaborador / GBC_Total_NegociadoDAO

As Shares da DAO tem duas grandes importâncias em destaque uma é a governança aonde é necessário 51% dos votantes para Aprovar Alterações na DAO a outra é a Divisão de Lucros que ocorre de acordo com os Shares de cada colaborador.
Proof-of-Work e Formação do Fundo de Reserva

OS Tokens GCB equivalem a shares e dão acesso a participação nos “Lucros”, da DAO mas essa divisão de lucro precisa ser organizada de maneira considerada justa e adequada pelos colaboradores.
DAO x Empresa
 Numa empresa convencional o funcionário realiza uma atividade e a empresa capta o dinheiro sobre atividade do funcionário e parte desse dinheiro vai para funcionário outra parte vai para o caixa da empresa, parte desse caixa e usado para investimento interno e outra parte vira lucro para os sócios da empresa.

Numa DAO assim como uma empresa normal também precisa ter caixa para que ela possa realizar ações de seu interesse e fomentar seu próprio crescimento, entretanto a DAO não visa lucro assim quando um colaborador realizar uma função ele vai receber parte de sua atividade e para parte que for para o caixa da DAO, ele recebera tokens GCB equivalentes o que farão dele um “sócio da DAO” e assim com participação nos lucros proporcional a sua contribuição.
Outra tarefa importante numa empresa é organizar as pessoas por atividades específicas, assim cada colaborador fica destinado um tipo específico de atividade e a empresa que organiza as salários de cada pessoa de acordo com atividade.

Com evolução da informação a DAO permite que criamos regras específicas para automatizar esse processo de distribuição de tarefa e recompensas. Vamos exemplificar dentro da Go BlockChain foco é educação assim uma das principais atividades e a prestação de cursos:  

Elaboração Material didático 
Ministrar as Aulas
Organização do evento
Venda do curso
Divulgação e Marketing

Dividimos em 5 grande atividades, embora alguns profissionais individuais consigam resolver todas as 5 atividades , fazendo desde a divulgação, venda , organização locação de espaço a ministrar o curso , é mais simples escalar o processo se cada colaborador precisar realizar um fragmento de  atividade menor.


Vamos simular um Curso realizado pela DAO, utilizando a tabela de porcentagem descrita


IN:
Valor: 50 ETH por aluno
Número de alunos : 10
total 500 ETH
OUT:
Aluguel: 80 ETH
Coffee Break: 20 ETH

A primeira parte do processo e Pagar os custos no caso 100 ETH, depois o restante 400 ETH e distribuído por atividade, desses 20% serão direcionados para o fundo de reserva que nesse caso armazenaria 80 ETH e emitiria 8000 GBC divididos pelos colaboradores.
Valorizando Novos Colaboradores 
Como token garante participação periódica na divisão de lucros da DAO, conforme for crescendo o grupo de colaboradores e o número de GBC negociado aumentar corre-se o risco de  que novos colaboradores não tenham interesse em se juntar a DAO pois a receita de suas colaborações será dividida com um grande número de steakholder dos quais boa parte já não pode estar colaborando mais com a DAO e dessa forma gerando resultados.
Para solucionar esse problema Toda vez que um período for fechado e realizada a divisão de lucro, automaticamente o SmartContract da DAO vai gerar uma inflação de XX% forçada sobre o valor do Token GBC, e vai reajustar a Tabela de Recompensa por Contribuição com o valor da Inflação gerada sobre o GBC de XX% .
Assim vamos simular que ao fim de um período semestral o fundo de reserva da DAO continha 100 ETH e existiam 100.000 GBT, nesse momento 75% dos ETH serão distribuídos de acordo com as Shares e restaram 25 ETH restaram no fundo de reserva e será aplicada uma inflação de 50% o que implica que serão emitidos mais 50.000 GBT, esses GBT serão colocados à venda a mercado dentro do módulo de leilão All-Pay e os ETH arrecadados no leilão irão para o fundo de Reserva da DAO, e a tabela de remuneração também será reajustada de acordo com a inflação se estavam sendo pagos 1000 GBT por ETH , no semestre seguinte serão pagos 1500 GBT por ETH, e assim também a tabela de valores fixos também será reajustada na mesma proporção.