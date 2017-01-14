using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using SimpleJSON;

public class textskript : MonoBehaviour {
    TextMesh t;
	// Use this for initialization
	void Start () {

        t = (TextMesh)gameObject.GetComponent(typeof(TextMesh));
        t.text = "script changed text";
        StartCoroutine(GetText());


    }
    // http://secondcousins.studio/
    // Update is called once per frame
    void Update () {
		
	}

    IEnumerator GetText()
    {
        UnityWebRequest www = UnityWebRequest.Get("https://jsonplaceholder.typicode.com/posts/1");
        yield return www.Send();

        if (www.isError)
        {
            Debug.Log(www.error);
        }
        else
        {
            // Show results as text
            Debug.Log(www.downloadHandler.text);
            //t.text = www.downloadHandler.text;
            var N = JSON.Parse(www.downloadHandler.text);
            t.text = N["title"];

            // Or retrieve results as binary data
            byte[] results = www.downloadHandler.data;
        }
    }
}
