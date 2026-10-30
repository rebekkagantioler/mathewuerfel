import Cocoa
import WebKit

// Run from the project root: swift tests/browser.swift
let root = FileManager.default.currentDirectoryPath
let configuration = WKWebViewConfiguration()
configuration.websiteDataStore = .nonPersistent()
let web = WKWebView(frame:NSRect(x:0,y:0,width:390,height:844),configuration:configuration)
class CheckDelegate: NSObject, WKNavigationDelegate {
    var done=false
    var failed=false
    let checks:[(String,Int,Int)] = [
        ("stories",390,844),("stories",844,390),("stories",320,568),
        ("stories",1024,768),("stories",667,320),
        ("duel",390,844),("duel",844,390),("duel",320,568),
        ("duel",1024,768),("duel",667,320),("updates",390,844),("learning",390,844),("learning",320,568),("learning",1024,768),("homework",390,844),("rewards",390,844),("profiles",390,844),("minus",390,844),("minus",320,568),("collection",390,844),("collection",320,568),("collection",1024,768)
    ]
    func webView(_ webView:WKWebView,didFinish navigation:WKNavigation!){ run(webView,0) }
    func run(_ webView:WKWebView,_ index:Int){
        if index==checks.count {done=true;return}
        let (name,width,height)=checks[index]
        webView.setFrameSize(NSSize(width:width,height:height))
        DispatchQueue.main.asyncAfter(deadline:.now()+0.1){
            do {
                let source=try String(contentsOfFile:root+"/tests/"+name+".js",encoding:.utf8)
                let arguments:[String:Any] = [
                    "updatesSource":try String(contentsOfFile:root+"/updates.js",encoding:.utf8),
                    "workerSource":try String(contentsOfFile:root+"/sw.js",encoding:.utf8)
                ]
                webView.callAsyncJavaScript(source,arguments:arguments,in:nil,in:.page){result in
                    switch result {
                    case .success(let report):
                        print("PASS \(name) \(width)×\(height): \(report)")
                        self.run(webView,index+1)
                    case .failure(let error):
                        print("FAIL \(name): \(error)")
                        self.failed=true;self.done=true
                    }
                }
            }catch{print(error);self.failed=true;self.done=true}
        }
    }
}
let delegate=CheckDelegate()
web.navigationDelegate=delegate
web.loadFileURL(URL(fileURLWithPath:root+"/index.html"),allowingReadAccessTo:URL(fileURLWithPath:root))
let deadline=Date().addingTimeInterval(60)
while !delegate.done && Date()<deadline {RunLoop.current.run(until:Date().addingTimeInterval(0.1))}
if !delegate.done {print("Timed out");exit(1)}
if delegate.failed {exit(1)}
