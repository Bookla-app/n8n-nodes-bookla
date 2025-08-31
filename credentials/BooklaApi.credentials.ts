import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class BooklaApi implements ICredentialType {
	name = 'booklaApi';
	displayName = 'Bookla API';
	documentationUrl = 'https://docs.bookla.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}'
			}
		},
	};
	test: ICredentialTestRequest = {
		request: {
			// Build base URL from region
			baseURL:
				'={{$credentials.region === "us" ? "https://us.bookla.com/api/v1" : "https://eu.bookla.com/api/v1"}}',
			// Use a cheap, read-only endpoint that requires auth:
			// GET /client/companies/{company_id}/resources?limit=1
			url: '/client/companies/{{$credentials.companyId}}/resources',
			method: 'GET',
			qs: { limit: 1 },
		},
	};
}
