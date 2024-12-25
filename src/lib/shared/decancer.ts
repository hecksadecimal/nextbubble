import unidecode from "unidecode";

export function decancer(str: string) {
	str = str.normalize('NFKC');
	str = str.normalize('NFD');
	str = unidecode(str);
	str = str.replaceAll(/\[\?\]/g, '');

	return str.trim();
};