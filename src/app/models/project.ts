export interface Project {
  id_prjeto: number;
  projeto: string;
  id_financiador: number;
  id_area_tecnologica: number;
  id_coordenador: number;
  ativo: boolean;
  inicio_vigencia: string;
  fim_vigencia: string;
  valor: number;
}