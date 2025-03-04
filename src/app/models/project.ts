export interface Project {
  id_projeto: number;
  projeto: string;
  coordenador: string;
  id_financiador?: number;
  id_area_tecnologica?: number;
  ativo: boolean;
  inicio_vigencia: string;
  fim_vigencia: string;
  valor: number;
}

export interface ProjectFilters {
  projeto?: string;
  inicio_vigencia?: string;
  fim_vigencia?: string;
  ativo?: boolean;
}
