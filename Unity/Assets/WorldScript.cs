using SimpleJSON;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class WorldScript : MonoBehaviour {

	// Use this for initialization
	void Start () {
        StartCoroutine(GetText());
    }
	
	// Update is called once per frame
	void Update () {
		
	}



    IEnumerator GetText()
    {
        UnityWebRequest www = UnityWebRequest.Get("https://rbe.dev.bitnamic.net/api/instructions/hackos-team1");
        yield return www.Send();

        if (www.isError)
        {
            Debug.Log(www.error);
        }
        else
        {
            // Show results as text
            //Debug.Log(www.downloadHandler.text);
            //t.text = www.downloadHandler.text;
            var N = JSON.Parse(www.downloadHandler.text);
            //t.text = N["instructions"][0]["textual_instruction"];

            for (int i = 0; i < 4; i++)
            {
                var object_part = N["instructions"][i]["object_part"].ToString();

                var id = object_part.Substring(object_part.Length - 1, 1);
                var name = object_part.Substring(1, object_part.Length - 3);
                Debug.Log(name);
                if (name == "greiferteil")
                {
                    GameObject sphere = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                    sphere.transform.position = new Vector3(2*i - 4, 1.5F, 0);
                }
                if (name == "feder")
                {
                    GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
                    cube.transform.position = new Vector3(2*i - 4, 1.5F, 0);
                }


            }


            // Or retrieve results as binary data
            //byte[] results = www.downloadHandler.data;
        }
    }






}
