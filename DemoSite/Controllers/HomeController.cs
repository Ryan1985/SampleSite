﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace DemoSite.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NewIndex()
        {
            return View();
        }
    }
}
