let gralhas = []; // Armazena todas as gralhas azuis criadas
let arvores = [];
let cidadeX;

function setup() {
  createCanvas(800, 400);
  cidadeX = width / 2;
}

function draw() {
  background(135, 206, 235); // céu

  // Campo
  noStroke();
  fill(144, 238, 144);
  rect(0, height / 2, width, height / 2);

  // Sol
  fill(255, 223, 0);
  ellipse(80, 80, 80);

  // Cidade (prédios)
  for (let i = 0; i < 5; i++) {
    let x = cidadeX + i * 40;
    let y = height / 2 - 100;
    let largura = 30;
    let altura = 100;

    // Prédio
    fill(100);
    rect(x, y, largura, altura);

    // Janelas (3 linhas, 2 colunas por prédio)
    let janelaLargura = 6;
    let janelaAltura = 10;
    let espacamentoX = 8;
    let espacamentoY = 20;

    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 2; coluna++) {
        let janelaX = x + 5 + coluna * espacamentoX;
        let janelaY = y + 10 + linha * espacamentoY;
        fill(255, 255, 150); // Amarelo claro (luz)
        rect(janelaX, janelaY, janelaLargura, janelaAltura);
      }
    }
  }

  // Lago
  fill(0, 0, 255); // Azul para o lago
  ellipse(width / 4, (height / 2) + 75, 150, 50); // Posição e tamanho do lago

  // Campo (árvores)
  for (let arvore of arvores) {
    arvore.mostrar();
  }

  // Mostrar e mover gralhas
  for (let i = gralhas.length - 1; i >= 0; i--) {
    gralhas[i].mover();
    gralhas[i].mostrar();

    // Remove se sair da tela
    if (gralhas[i].x > width + 50) {
      gralhas.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (mouseY > height / 2 && mouseX < cidadeX) {
    arvores.push(new Arvore(mouseX, mouseY));
    gralhas.push(new GralhaAzul(0, random(50, 150))); // Cria uma gralha voando
  }
}

class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 0;
  }

  mostrar() {
    this.altura = min(this.altura + 1, 80); // Crescimento mais alto

    // Tronco
    fill(101, 67, 33);
    rect(this.x - 2, this.y - this.altura, 4, this.altura);

    // Camadas da copa da araucária (em forma de disco)
    let numCamadas = 3;
    let camadaAltura = 15;
    let camadaLargura = [60, 45, 30]; // Tamanho das copas

    for (let i = 0; i < numCamadas; i++) {
      fill(34, 139, 34);
      ellipse(
        this.x,
        this.y - this.altura - i * camadaAltura,
        camadaLargura[i],
        15
      );
    }
  }
}

class GralhaAzul {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = random(1, 3);
  }

  mostrar() {
    fill(70, 130, 180); // Azul acinzentado do corpo
    ellipse(this.x, this.y, 20, 15); // Corpo

    fill(0); // Preto da cabeça
    ellipse(this.x - 10, this.y - 5, 10, 10);

    fill(255, 215, 0); // Amarelo do bico
    triangle(this.x - 15, this.y - 2, this.x - 10, this.y - 5, this.x - 15, this.y - 8);
  }

  voar() {
    this.x += this.velocidade;
    if (this.x > width + 50) { // Ajuste para remover completamente da tela
      this.x = -20; // Volta do início da tela
      this.y = random(50, 150); // Nova altura aleatória
      this.velocidade = random(1, 3); // Nova velocidade aleatória
    }
  }

  mover() {
    this.voar();
  }
}
