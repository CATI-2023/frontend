export type palestra = {
  palestra_id?: number;
  tema: string;
  atuacao_palestrante: string;
  lattes_palestrante: string;
  descricao: string;
  data: string;
  evento_id_reference?: number;
  participante_id_reference?: number;
  evento?: evento;
  palestrante?: participante;
};

export type competicao = {
  competicao_id?: number;
  descricao: string;
  titulo: string;
  qtde_membros_equipe: number;
  inscricao_data_inicio: string;
  inscricao_data_fim: string;
  valor_inscricao: number;
  regulamento: string;
  banner: string;
  tabela_jogos: string;
  regulamento_pdfFile?: File | null;
  banner_pictureFile?: File | null;
  tabelaJogos_pdfFile?: File | null;
};

export type equipe = {
  equipe_id?: number;
  nome: string;
  competicao?: competicao;
  competicao_id_reference?: number;
  pagamento?: pagamentos;
  pagamento_id_reference?: number;
  participante_id_reference?: number;
  MembroEquipe?: membroEquipe[];
};

export type membroEquipe = {
  membro_equipe_id?: number;
  equipe_id_reference?: number;
  participante_id_reference?: number;
  lider: boolean;
  equipe?: equipe;
  participante?: participante;
};

export type palestraIndex = {
  tema: string;
  atuacao_palestrante: string;
  lattes_palestrante: string;
  data: string;
  palestrante?: {
    foto: string;
    nome: string;
  };
};

export type participantesList = { participantes: participante[] };

export type participante = {
  participante_id?: number;
  nome: string;
  foto?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  senha?: string;
  organizacao?: boolean;
};

export type frequencia = {
  frequencia_id?: number;
  inscricao_evento_id_reference?: number;
  inscricao_evento?: inscricaoEventoGet;
  data?: string;
};

export type patrocinadores = {
  patrocinador_id?: number;
  evento_id_reference?: number;
  razao_social: string;
  nivel: "OURO" | "PRATA" | "BRONZE";
  banner: string;
  email: string;
  telefone: string;
  evento?: evento;
  banner_pictureFile?: File | null;
};
export type apoiadores = { patrocinadores: patrocinadores[] };

export type colaboradoresIndex = {
  razao_social: string;
  nivel: "OURO" | "PRATA" | "BRONZE";
  banner: string;
};

export type evento = {
  ano?: number;
  tema?: string;
  data_inicio: string;
  data_fim: string;
  qtde_vagas?: number;
  banner?: string;
  valor?: number;
  evento_id?: number;
  vigente?: boolean;
  banner_pictureFile?: File | null;
};

export type eventos = { eventos: evento[] };

export type miniCursos = {
  minicursos: minicurso[];
};

export type minicurso = {
  titulo: string;
  valor: number;
  descricao: string;
  qtde_vagas: number;
  data: string;
  evento_id_reference?: number;
  ministrante_participante_id_reference?: number;
  ministrante?: participante;
  evento?: evento;
  minicurso_id?: number;
};

export type ministrante = {
  nome?: string;
  participante_id?: number;
};

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
export type inscricaoEvento = {
  evento_id_reference?: number;
  participante_id_reference?: number;
  observacoes?: string;
  pagamento_id_reference?: number;
};

export type inscricaoEventoGet = {
  inscricao_evento_id?: number;
  observacoes?: string;
  evento_id_reference?: number;
  evento?: evento;
  participante_id_reference?: number;
  participante?: participante;
  pagamento_id_reference?: number;
  pagamento?: {
    pagamento_id?: number;
    status?: "APROVADO" | "PENDENTE" | "RECUSADO";
    comprovante?: string;
  };
};

export type pagamentos = {
  status: "APROVADO" | "PENDENTE" | "RECUSADO";
  comprovante: string;
  comprovante_pdfFile?: File | null;
};

export type ParticipanteAuth = {
  participante_id: number;
  nome: string;
  foto: string;
  cpf: string;
  telefone: string;
  organizacao: boolean;
  email: string;
  excluido?: string;
  InscricaoEvento: InscricaoEvento[];
};

export type InscricaoEvento = {
  inscricao_evento_id: number;
  observacoes: string;
  evento_id_reference: number;
  participante_id_reference: number;
  pagamento_id_reference: number;
  criado_em: string;
  alterado_em: string;
  excluido?: string;
  pagamento: Pagamento;
  evento: evento;
};

export type Pagamento = {
  pagamento_id: number;
  status: "APROVADO" | "PENDENTE" | "RECUSADO";
  comprovante: string;
  criado_em: string;
  alterado_em: string;
  excluido?: string;
};
