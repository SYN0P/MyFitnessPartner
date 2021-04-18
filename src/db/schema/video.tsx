/* eslint-disable camelcase */

const VideoSchema = {
	'title': 'Video',
	'version': 0,
	'type': 'object',
	'properties': {
		'video_id': {
			'type': 'number',
		},
		'video_name': {
			'type': 'string',
		},
		'thumbnail': {
			'type': 'string',
		},
		'timeline': {
			'type': 'array',
			'items': {
				'type': 'object',
				'properties': {
					'posd_2d': {
						'type': 'array',
						'items': {
							'type': 'object',
							'properties': {
								'x': {
									'type': 'number',
								},
								'y': {
									'type': 'number',
								},
							},
						},
					},
					'posd_3d': {
						'type': 'array',
						'items': {
							'type': 'object',
							'properties': {
								'x': {
									'type': 'number',
								},
								'y': {
									'type': 'number',
								},
								'z': {
									'type': 'number',
								},
							},
						},
					},
				},
			},
		},
	},
};

/* eslint-disable camelcase */

export { VideoSchema };