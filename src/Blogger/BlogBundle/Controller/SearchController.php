<?php

namespace Blogger\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class SearchController extends Controller{
	
	public function searchAction(){
		if(isset($_GET['find'])){
			$find = $_GET['find'];
			$url = $this->generateUrl('BloggerBlogBundle_search', array('index' =>$find));
			return $this->redirect($url);
		}
		return $this->render('BloggerBlogBundle:Search:index.html.twig');
	}
	public function findAction($index){
		return $this->render('BloggerBlogBundle:Search:find.html.twig',array('index' =>$index));
	}
}