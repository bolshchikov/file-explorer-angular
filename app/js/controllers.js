'use strict';

/* Controllers */


function TreeCtrl (self, http, route) {
	self.folders = [];
	self.$on('TreeUpd', function(event) {
		console.log(event.targetScope.root);
		if (self.folders.length === 0) {
			http.get('/folder/' + event.targetScope.root).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].type === 'folder') {
						self.folders.push(data[i]);
					}
				}
			});
		}
		else {
			self.node = (function(list, name){
				for (var i = 0; i < list.length; i++) {
					if (list[i].name === name) return list[i];
				}
			}(self.folders, event.targetScope.root));
			http.get('/folder/' + event.targetScope.root).success(function(data) {
				console.log(self.node);
				for (var i = 0; i < data.length; i++) {
					if (data[i].type === 'folder') {
						self.node.elements.push(data[i]);
					}
				}
			});
		}
		
	})
}
TreeCtrl.$inject = ['$scope', '$http', '$routeParams'];

function FolderCtrl (self, http, route) {
	self.root = route.name;
	self.$emit('TreeUpd');
	http.get('/folder/' + route.name).success(function(data) {
		self.elements = data;
	});
	self.showDetails = function(name) {
		for (var i = 0; i < self.elements.length; i++) {
			if (name === self.elements[i].name) {
				self.element = self.elements[i];
				break;
			}
		}
		$('.modal').modal('show');
	}
}
FolderCtrl.$inject = ['$scope', '$http', '$routeParams'];
