export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  precoPromocional: number;
  imagem: string;
  categoria: string;
  estoque: number;
  promocao: boolean;
}