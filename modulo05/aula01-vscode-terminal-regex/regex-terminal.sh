# a partir da pasta raiz

find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt
find . -name *.js -not -path '*node_modules**' | ipt -o

# para selecionar o arquivo que deseja alterar
CONTENT="'use strict';" find . -name *.js -not -path '*node_modules**' | ipt -o | xargs -I '{file}' sed -i "" -e 'ls/^/\'$CONTENT'\
/g' {file}

# ls -> primeira linha
# ^-> primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implícito 

# para alterar todos os arquivos pesquisados
CONTENT="'use strict';" find . -name *.js -not -path '*node_modules**' | xargs -I '{file}' sed -i "" -e 'ls/^/\'$CONTENT'\
/g' {file}


