import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Bookla implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bookla',
		name: 'Bookla',
		icon: 'file:bookla_icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from Bookla\'s API',
		defaults: {
			name: 'Bookla',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'BooklaApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://us.bookla.com/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Service',
						value: 'service',
					},
					{
						name: 'Resource',
						value: 'resource',
					},
					{
						name: 'Booking',
						value: 'booking',
					},
					{
						name: 'Client',
						value: 'client',
					},
				],
				default: 'service',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'service',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get a service',
						description: 'Get a Service Info',
						routing: {
							request: {
								method: 'GET',
								url: "=/v1/companies/{{$parameter.company_id}}/services/{{$parameter.service_id}}",
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Get many services',
						description: 'Get many services',
						routing: {
							request: {
								method: 'GET',
								url: "=/v1/companies/{{$parameter.company_id}}/services",
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update service',
						description: 'Update service',
						routing: {
							request: {
								method: 'PATCH',
								url: "=/v1/companies/{{$parameter.company_id}}/services/{{$parameter.service_id}}",
								body: {
									name: '={{$parameter.name || null}}',
									color: '={{$parameter.color || null}}',
									metaDataUpdate: '={{$parameter.metaDataUpdate?.metaDataFields ? {expectedVersion: $parameter.metaDataUpdate.metaDataFields.expectedVersion, path: $parameter.metaDataUpdate.metaDataFields.path,value: typeof $parameter.metaDataUpdate.metaDataFields.value === "string" ? JSON.parse($parameter.metaDataUpdate.metaDataFields.value) : $parameter.metaDataUpdate.metaDataFields.value} : null}}',
								},
							},
						},
					},
					{
						name: 'Get Times',
						value: 'getTimes',
						action: 'Get available times',
						description: 'Get available times for a service',
						routing: {
							request: {
								method: 'POST',
								url: "=/v1/companies/{{$parameter.company_id}}/services/{{$parameter.service_id}}/times",
								body: {
									from: '={{new Date($parameter.from).toISOString()}}',
									to: '={{new Date($parameter.to).toISOString()}}',
									duration: '={{$parameter.duration || undefined}}',
									spots: '={{$parameter.spots || undefined}}',
									resourceIDs: '={{$parameter.resourceIds || undefined}}',
									tickets: '={{$parameter.tickets?.ticketValues ? Object.fromEntries($parameter.tickets.ticketValues.map(t => [t.id, t.quantity])) : undefined}}',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'resource',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get a resource',
						description: 'Get a Resource Info',
						routing: {
							request: {
								method: 'GET',
								url: "=/v1/companies/{{$parameter.company_id}}/resources/{{$parameter.resource_id}}",
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Get list of resources',
						description: 'Get List of Resources',
						routing: {
							request: {
								method: 'GET',
								url: "=/v1/companies/{{$parameter.company_id}}/resources",
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update resource',
						description: 'Update resource',
						routing: {
							request: {
								method: 'PATCH',
								url: "=/v1/companies/{{$parameter.company_id}}/resources/{{$parameter.resource_id}}",
								body: {
									name: '={{$parameter.name || null}}',
									color: '={{$parameter.color || null}}',
									metaDataUpdate: '={{$parameter.metaDataUpdate?.metaDataFields ? {expectedVersion: $parameter.metaDataUpdate.metaDataFields.expectedVersion, path: $parameter.metaDataUpdate.metaDataFields.path,value: typeof $parameter.metaDataUpdate.metaDataFields.value === "string" ? JSON.parse($parameter.metaDataUpdate.metaDataFields.value) : $parameter.metaDataUpdate.metaDataFields.value} : null}}',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'booking',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get a booking',
						description: 'Get one booking',
						routing: {
							request: {
								method: 'GET',
								url: "=/v1/companies/{{$parameter.company_id}}/bookings/{{$parameter.booking_id}}",
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Get many bookings',
						description: 'Get list of bookings',
						routing: {
							request: {
								method: 'GET',
								url: "=/v1/companies/{{$parameter.company_id}}/bookings",
								qs: {
									from: '={{$parameter.from ? new Date($parameter.from).toISOString() : undefined}}',
									to: '={{$parameter.to ? new Date($parameter.to).toISOString() : undefined}}',
									limit: '={{$parameter.limit}}',
									offset: '={{$parameter.offset}}',
									resourceIDs: '={{$parameter.resourceIds ? $parameter.resourceIds.join(",") : undefined}}',
									serviceIDs: '={{$parameter.serviceIds ? $parameter.serviceIds.join(",") : undefined}}',
									clientID: '={{$parameter.clientId || undefined}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a booking',
						description: 'Update booking details',
						routing: {
							request: {
								method: 'PATCH',
								url: "=/v1/companies/{{$parameter.company_id}}/bookings/{{$parameter.booking_id}}",
								body: {
									duration: '={{$parameter.duration || undefined}}',
									metaDataUpdate: '={{$parameter.metaDataUpdate?.metaDataFields ? {expectedVersion: $parameter.metaDataUpdate.metaDataFields.expectedVersion, path: $parameter.metaDataUpdate.metaDataFields.path, value: typeof $parameter.metaDataUpdate.metaDataFields.value === "string" ? JSON.parse($parameter.metaDataUpdate.metaDataFields.value) : $parameter.metaDataUpdate.metaDataFields.value} : undefined}}',
									price: '={{$parameter.price || undefined}}',
									resourceID: '={{$parameter.resourceId || undefined}}',
									spots: '={{$parameter.spots || undefined}}',
									startTime: '={{$parameter.startTime ? new Date($parameter.startTime).toISOString() : undefined}}',
									status: '={{$parameter.status || undefined}}',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'client',
						],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search for clients',
						description: 'Search for clients by clientID, externalUserID or email',
						routing: {
							request: {
								method: 'GET',
								url: "=/v1/companies/{{$parameter.company_id}}/clients/search",
								qs: {
									clientID: '={{$parameter.clientID || undefined}}',
									email: '={{$parameter.email || undefined}}',
									externalUserID: '={{$parameter.externalUserID || undefined}}',
								},
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Get list of clients',
						description: 'Get list of clients',
						routing: {
							request: {
								method: 'GET',
								url: "=/v1/companies/{{$parameter.company_id}}/clients",
								qs: {
									limit: '={{$parameter.limit}}',
									offset: '={{$parameter.offset}}',
								},
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Company ID',
				name: 'company_id',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'service',
							'resource',
							'booking',
							'client'
						],
						operation: [
							'get', 'getAll', 'update', 'getTimes', 'search'
						],
					},
				},
			},
			{
				displayName: 'Service ID',
				name: 'service_id',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'service',
						],
						operation: [
							'get','update', 'getTimes'
						],
					},
				},
			},
			{
				displayName: 'Resource ID',
				name: 'resource_id',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['resource'],
						operation: ['get', 'getAll', 'update'],
					},
				},
			},
			/** Update Service and resource */
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['service', 'resource'],
						operation: ['update'],
					},
				},
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['service', 'resource'],
						operation: ['update'],
					},
				},
			},
			// Times operation parameters
			{
				displayName: 'From',
				name: 'from',
				type: 'dateTime',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getTimes'],
					},
				},
				description: 'Start of a time range in RFC3339 format',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'dateTime',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getTimes'],
					},
				},
				description: 'End of a time range in RFC3339 format',
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'string',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getTimes'],
					},
				},
				description: 'Duration in ISO8601 format (eg. PT1H). Required for flexible services.',
			},
			{
				displayName: 'Spots',
				name: 'spots',
				type: 'number',
				required: false,
				default: 1,
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getTimes'],
					},
				},
				description: 'Number of spots to book. Required for group services.',
			},
			{
				displayName: 'Resource IDs',
				name: 'resourceIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				required: false,
				default: [],
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getTimes'],
					},
				},
				description: 'IDs of resources to check availability for',
			},
			{
				displayName: 'Tickets',
				name: 'tickets',
				type: 'fixedCollection',
				default: {},
				required: false,
				displayOptions: {
					show: {
						resource: ['service'],
						operation: ['getTimes'],
					},
				},
				description: 'Key-value pairs of ticket IDs and quantities. Required for ticket services.',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'ticketValues',
						displayName: 'Ticket',
						values: [
							{
								displayName: 'Ticket ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'ID of a ticket',
							},
							{
								displayName: 'Quantity',
								name: 'quantity',
								type: 'number',
								default: 1,
								description: 'Number of tickets',
							},
						],
					},
				],
			},
			/** Booking **/
			{
				displayName: 'Booking ID',
				name: 'booking_id',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['get', 'update'],
					},
				},
			},
			{
				displayName: 'From Date',
				name: 'from',
				type: 'dateTime',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['getAll'],
					},
				},
				description: 'From date and time in RFC3339 format',
			},
			{
				displayName: 'To Date',
				name: 'to',
				type: 'dateTime',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['getAll'],
					},
				},
				description: 'To date and time in RFC3339 format',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				required: false,
				default: 50,
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['getAll'],
					},
				},
				description: 'Max number of results to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				required: false,
				default: 0,
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['getAll'],
					},
				},
				description: 'Offset for pagination',
			},
			{
				displayName: 'Resource IDs',
				name: 'resourceIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				required: false,
				default: [],
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['getAll'],
					},
				},
				description: 'Filter bookings by resource IDs',
			},
			{
				displayName: 'Service IDs',
				name: 'serviceIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				required: false,
				default: [],
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['getAll'],
					},
				},
				description: 'Filter bookings by service IDs',
			},
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['getAll'],
					},
				},
				description: 'Filter bookings by client ID',
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'string',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['update'],
					},
				},
				description: 'Duration in ISO8601 format (eg. PT1H)',
			},
			{
				displayName: 'Price',
				name: 'price',
				type: 'number',
				required: false,
				default: undefined,
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['update'],
					},
				},
				description: 'Price of a booking in fractional units (e.g., 1000 for $10.00)',
			},
			{
				displayName: 'Resource ID',
				name: 'resourceId',
				type: 'string',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['update'],
					},
				},
				description: 'ID of a resource for this booking',
			},
			{
				displayName: 'Spots',
				name: 'spots',
				type: 'number',
				required: false,
				default: undefined,
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['update'],
					},
				},
				description: 'Number of spots for a booking',
			},
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'dateTime',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['update'],
					},
				},
				description: 'Start time of a booking in RFC3339 format',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				required: false,
				default: '',
				options: [
					{
						name: 'Confirmed',
						value: 'confirmed',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Cancelled',
						value: 'cancelled',
					},
					{
						name: 'Finished',
						value: 'finished',
					},
					{
						name: 'No Show',
						value: 'no_show',
					},
					{
						name: 'Rejected',
						value: 'rejected',
					},
				],
				displayOptions: {
					show: {
						resource: ['booking'],
						operation: ['update'],
					},
				},
				description: 'Status of a booking',
			},
			/** Clients **/
			{
				displayName: 'Client ID',
				name: 'clientID',
				type: 'string',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'client',
						],
						operation: [
							'search',
						],
					},
				},
				description: 'Search by client ID in Bookla',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'client',
						],
						operation: [
							'search',
						],
					},
				},
				description: 'Search by client email address',
			},
			{
				displayName: 'External User ID',
				name: 'externalUserID',
				type: 'string',
				required: false,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'client',
						],
						operation: [
							'search',
						],
					},
				},
				description: 'Search by external user ID in your system',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				required: false,
				default: 50,
				displayOptions: {
					show: {
						resource: [
							'client',
						],
						operation: [
							'getAll',
						],
					},
				},
				description: 'Max number of results to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				required: false,
				default: 0,
				displayOptions: {
					show: {
						resource: [
							'client',
						],
						operation: [
							'getAll',
						],
					},
				},
				description: 'Offset for pagination',
			},
			/** Meta Data **/
			{
				displayName: 'Meta Data',
				name: 'metaDataUpdate',
				type: 'fixedCollection',
				description: 'Update meta data object',
				default: {},
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'metaDataFields',
						displayName: 'Meta Data Fields',
						values: [
							{
								displayName: 'Expected Version',
								name: 'expectedVersion',
								type: 'number',
								default: 0,
							},
							{
								displayName: 'Path',
								name: 'path',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'json',
								default: '{}',
								typeOptions: {
									alwaysOpenEditWindow: true,
								}
							}
						]
					}
				],
				displayOptions: {
					show: {
						resource: ['service', 'resource', 'booking'],
						operation: ['update'],
					},
				},
			},
		]
	};
}
