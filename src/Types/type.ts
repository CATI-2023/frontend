export type palestras = {
  tema: string;
  descricao: string;
  data: string;
  evento_id_reference: number;
};

export type participantes = {
  nome?: string;
  foto?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  senha?: string;
  organizacao?: boolean;
};
export type presenca = {
    participante_id_reference: number;
};
export type apoiadores = {
    nome: string
}
export type evento = {
    ano: number;
    tema: string;
    data_Inicio: string;
    data_Fim: string;
    qtde_vagas: number;
    banner_url: string
}
export type mini_curso = {
    titulo: string;
    valor: number;
    descricao: string;
    qtde_vagas: number;
    data: string;
    evento_id_reference: number;
    ministrante_participante_id_reference: number;
}
export type noticia = {
    texto: string;
    titutlo: string;
    subtitulo: string;
    chapeu: string;
    autor: string;
    data_publicacao: string;
    suspensa: boolean;
    evento_id_reference: number;
  };