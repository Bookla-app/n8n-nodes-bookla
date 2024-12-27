import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BooklaApi implements ICredentialType {
	name = 'BooklaApi';
	displayName = 'Bookla API';
	documentationUrl = 'https://docs.bookla.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}'
			}
		},
	} as IAuthenticateGeneric;
}
